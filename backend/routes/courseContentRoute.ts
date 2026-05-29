import express, { Request, Response } from "express"; 
import { PrismaClient, ContentStatus } from "@prisma/client";
import { upload, uploadToS3, deleteFromS3 } from "../config/s3";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from 'ffmpeg-static';
import { PassThrough } from "stream";
import AWS from "aws-sdk";
import fs from 'fs';
import path from 'path';
import os from 'os';
import { checkStudentActive } from "../middleware/checkStudentActive"; 


// ✅ ADD THIS INTERFACE HERE - before using it
interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    cognitoId: string;
  };
}



// Set the ffmpeg path to the static binary
if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}

const router = express.Router();
const prisma = new PrismaClient();


// Helper function to generate thumbnail from video buffer using temp files
const generateThumbnailWithTempFile = (videoBuffer: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    // Create temp files
    const tempInputPath = path.join(os.tmpdir(), `video-${Date.now()}.mp4`);
    const tempOutputPath = path.join(os.tmpdir(), `thumb-${Date.now()}.jpg`);
    
    // Write video buffer to temp file
    fs.writeFileSync(tempInputPath, videoBuffer);
    
    ffmpeg(tempInputPath)
      .screenshots({
        count: 1,
        folder: os.tmpdir(),
        filename: path.basename(tempOutputPath),
        size: '320x240',
        timestamps: ['00:00:02'] // Take screenshot at 2 seconds
      })
      .on('end', () => {
        try {
          // Read the generated thumbnail
          const thumbnailBuffer = fs.readFileSync(tempOutputPath);
          
          // Clean up temp files
          if (fs.existsSync(tempInputPath)) fs.unlinkSync(tempInputPath);
          if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
          
          resolve(thumbnailBuffer);
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => {
        // Clean up on error
        if (fs.existsSync(tempInputPath)) fs.unlinkSync(tempInputPath);
        if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
        reject(err);
      });
  });
};

// Helper function to upload buffer to S3
const uploadToS3FromBuffer = async (buffer: Buffer, key: string, contentType: string) => {
  const s3 = new AWS.S3({
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  });

  const result = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      // REMOVE ACL: 'public-read',
    })
    .promise();

  return {
    url: result.Location,
    key: key,
  };
};


// =====================
// GET COURSE CONTENT BY PROGRAM NAME
// =====================
router.get("/courses/:programName/content", async (req, res) => {
  try {
    const programName = req.params.programName;
    
    const content = await prisma.courseContent.findMany({
      where: { programName: programName },
      include: {
        uploadedBy: true,
      },
      orderBy: { order: "asc" },
    });

    const stats = {
      videos: content.filter((c) => c.type === "video").length,
      documents: content.filter((c) => c.type === "document").length,
      assignments: content.filter((c) => c.type === "assignment").length,
    };

    res.json({ success: true, content, stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch course content" });
  }
});

// =====================
// UPLOAD CONTENT WITH THUMBNAIL AND MODULE ASSIGNMENT
// =====================
router.post("/upload-content", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { programName, moduleId, title, type, description, uploadedById, duration } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    if (!programName || !title || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Uploading:", { programName, moduleId, title, type, fileSize: file.size });

    // Upload original file to S3
    const uploadResult = await uploadToS3(file, type);
    
    let thumbnailUrl = null;
    
    // Generate thumbnail for video files
    if (type === 'video') {
      try {
        console.log("Generating thumbnail for video...");
        const thumbnailBuffer = await generateThumbnailWithTempFile(file.buffer);
        
        // Upload thumbnail to S3
        const thumbnailFileName = `course-content/${type}/thumbnails/thumb-${Date.now()}.jpg`;
        const thumbnailUpload = await uploadToS3FromBuffer(thumbnailBuffer, thumbnailFileName, 'image/jpeg');
        thumbnailUrl = thumbnailUpload.url;
        console.log("Thumbnail generated and uploaded:", thumbnailUrl);
      } catch (error) {
        console.error("Thumbnail generation failed:", error);
        // Continue without thumbnail
      }
    }

    // Get the max order for this program
    let maxOrderResult;
    try {
      maxOrderResult = await prisma.courseContent.aggregate({
        where: { programName: programName },
        _max: { order: true },
      });
    } catch (error) {
      console.log("Note: programName might not exist in schema yet");
      maxOrderResult = { _max: { order: null } };
    }

    // Save to database - INCLUDING moduleId
    const content = await prisma.courseContent.create({
      data: {
        programName: programName,
        moduleId: moduleId ? parseInt(moduleId) : null,  // ← ADD THIS LINE
        title: title,
        type: type,
        description: description || null,
        fileUrl: uploadResult.url,
        thumbnailUrl: thumbnailUrl,
        fileSize: file.size,
        mimeType: file.mimetype,
        duration: duration || null,
        order: (maxOrderResult._max.order ?? -1) + 1,
        uploadedById: uploadedById ? parseInt(uploadedById) : null,
        status: ContentStatus.draft,
      },
    });

    res.json({
      success: true,
      content: content,
      file: uploadResult,
      thumbnail: thumbnailUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed: " + (error as Error).message });
  }
});

// =====================
// UPDATE CONTENT
// =====================
router.put("/courses/content/:contentId", async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);
    const { title, description, type, duration, status, order } = req.body;

    const updated = await prisma.courseContent.update({
      where: { id: contentId },
      data: {
        title: title,
        description: description,
        type: type,
        duration: duration,
        status: status,
        order: order,
      },
    });

    res.json({ success: true, content: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
});

// =====================
// DELETE CONTENT
// =====================
router.delete("/courses/content/:contentId", async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);

    const content = await prisma.courseContent.findUnique({
      where: { id: contentId },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Delete from S3 if file exists
    if (content.fileUrl) {
      await deleteFromS3(content.fileUrl);
    }
    
    // Delete thumbnail from S3 if exists
    if (content.thumbnailUrl) {
      await deleteFromS3(content.thumbnailUrl);
    }

    // Delete from database
    await prisma.courseContent.delete({
      where: { id: contentId },
    });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
});

// =====================
// UPDATE CONTENT STATUS
// =====================
router.patch("/courses/content/:contentId/status", async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);
    const { status } = req.body;
    
    console.log(`Attempting to update content ${contentId} to status: ${status}`);
    
    // Check if content exists first
    const existingContent = await prisma.courseContent.findUnique({
      where: { id: contentId },
    });
    
    if (!existingContent) {
      console.log(`Content ${contentId} not found`);
      return res.status(404).json({ error: "Content not found" });
    }
    
    console.log(`Found content: ${existingContent.title}, current status: ${existingContent.status}`);
    
    // Update the status
    const updated = await prisma.courseContent.update({
      where: { id: contentId },
      data: { status: status },
    });
    
    console.log(`Successfully updated content ${contentId} to status: ${status}`);
    res.json({ success: true, content: updated });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ error: "Status update failed: " + (error as Error).message });
  }
});

// =====================
// GET SINGLE CONTENT
// =====================
router.get("/content/:contentId", async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);
    
    const content = await prisma.courseContent.findUnique({
      where: { id: contentId },
      include: {
        uploadedBy: true,
      },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.json({ success: true, content: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetch failed" });
  }
});

// =====================
// GET ALL CONTENT (Optional - for admin)
// =====================
router.get("/all-content", async (req, res) => {
  try {
    const content = await prisma.courseContent.findMany({
      include: {
        uploadedBy: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, content: content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});


// =====================
// MODULE CRUD OPERATIONS
// =====================

// Get all modules for a program
router.get("/modules/:programName", async (req, res) => {
  try {
    const { programName } = req.params;
    
    const modules = await prisma.module.findMany({
      where: { programName },
      include: {
        contents: {
          orderBy: { order: "asc" }
        }
      },
      orderBy: { order: "asc" }
    });
    
    res.json({ success: true, modules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch modules" });
  }
});

// Create a new module
router.post("/modules", async (req, res) => {
  try {
    const { title, description, programName, order } = req.body;
    
    if (!title || !programName) {
      return res.status(400).json({ error: "Title and programName are required" });
    }
    
    // Get the next order number if not provided
    let moduleOrder = order;
    if (!moduleOrder) {
      const maxOrder = await prisma.module.aggregate({
        where: { programName },
        _max: { order: true }
      });
      moduleOrder = (maxOrder._max.order ?? -1) + 1;
    }
    
    const module = await prisma.module.create({
      data: {
        title,
        description: description || null,
        programName,
        order: moduleOrder,
        status: "draft"
      }
    });
    
    res.json({ success: true, module });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create module" });
  }
});

// Update module
router.put("/modules/:moduleId", async (req, res) => {
  try {
    const moduleId = parseInt(req.params.moduleId);
    const { title, description, order, status } = req.body;
    
    const updated = await prisma.module.update({
      where: { id: moduleId },
      data: { title, description, order, status }
    });
    
    res.json({ success: true, module: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update module" });
  }
});

// Delete module - ONLY if empty
router.delete("/modules/:moduleId", async (req, res) => {
  try {
    const moduleId = parseInt(req.params.moduleId);
    
    // Check if module has any content
    const moduleWithContents = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        contents: true
      }
    });
    
    if (!moduleWithContents) {
      return res.status(404).json({ error: "Module not found" });
    }
    
    // If module has content, prevent deletion
    if (moduleWithContents.contents.length > 0) {
      return res.status(400).json({ 
        error: `Cannot delete module "${moduleWithContents.title}". It contains ${moduleWithContents.contents.length} content item(s). Please delete all content from this module first.`,
        contentsCount: moduleWithContents.contents.length,
        contents: moduleWithContents.contents.map(c => ({ id: c.id, title: c.title, type: c.type }))
      });
    }
    
    // Only delete if empty
    await prisma.module.delete({
      where: { id: moduleId }
    });
    
    res.json({ success: true, message: "Module deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete module" });
  }
});
// Assign content to module
router.patch("/content/:contentId/assign-module", async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);
    const { moduleId, order } = req.body;
    
    const updated = await prisma.courseContent.update({
      where: { id: contentId },
      data: {
        moduleId: moduleId || null,
        order: order || 0
      }
    });
    
    res.json({ success: true, content: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign content to module" });
  }
});

// Get module structure for student view
router.get("/program/:programName/module-structure", async (req, res) => {
  try {
    const { programName } = req.params;
    
    const modules = await prisma.module.findMany({
      where: { 
        programName,
        status: "published"
      },
      include: {
        contents: {
          where: { status: "published" },
          orderBy: { order: "asc" }
        }
      },
      orderBy: { order: "asc" }
    });
    
    res.json({ success: true, modules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch module structure" });
  }
});






// =====================
// GET STUDENT COURSE CONTENT (Based on Student's Email from Query)
// ✅ PROTECT THIS ROUTE
router.get("/student/course-content", checkStudentActive, async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.query;
    
    // ✅ FIXED: Properly extract email as string with type assertion
    const studentEmail = typeof email === 'string' ? email : (Array.isArray(email) ? email[0] : null);
    
    if (!studentEmail && !req.user?.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Use the authenticated user's email if not provided in query
    const finalEmail: string = (studentEmail || req.user?.email || '') as string;
    
    if (!finalEmail) {
      return res.status(400).json({ error: "Student email is required" });
    }

    // ✅ FIXED: Use include with proper typing
    const student = await prisma.student.findUnique({
      where: { email: finalEmail },
      include: {
        enrollments: {
          include: {
            contentProgress: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (!student.programName) {
      return res.status(404).json({ error: "Student is not enrolled in any program" });
    }

    // Get all content progress for this student
    const contentProgressMap = new Map();
    
    if (student.enrollments && student.enrollments.length > 0) {
      for (const enrollment of student.enrollments) {
        if (enrollment.contentProgress && enrollment.contentProgress.length > 0) {
          for (const progress of enrollment.contentProgress) {
            contentProgressMap.set(progress.contentId, {
              isCompleted: progress.isCompleted,
              lastPosition: progress.lastPosition,
              score: progress.score,
              enrollmentId: enrollment.id
            });
          }
        }
      }
    }

    // ALSO check for assignment submissions (even without progress record)
    const assignmentSubmissions = await prisma.assignmentSubmission.findMany({
      where: {
        studentId: student.id,
      },
      select: {
        assignmentId: true,
        submittedAt: true,
      }
    });

    const assignmentSubmissionMap = new Map();
    for (const submission of assignmentSubmissions) {
      assignmentSubmissionMap.set(submission.assignmentId, {
        submitted: true,
        submittedAt: submission.submittedAt
      });
    }

    console.log("Content progress found:", contentProgressMap.size);
    console.log("Assignment submissions found:", assignmentSubmissionMap.size);

    // ✅ FIXED: programName is now properly typed as string
    const modules = await prisma.module.findMany({
      where: {
        programName: student.programName,
        status: "published"
      },
      include: {
        contents: {
          where: {
            status: "published"
          },
          orderBy: { order: "asc" }
        }
      },
      orderBy: { order: "asc" }
    });

    console.log("PUBLISHED modules found:", modules.length);

    let totalLessons = 0;
    let completedLessons = 0;

    const formattedModules = modules.map((module) => {
      // ✅ FIXED: 'contents' now exists because of include
      const materials = module.contents.map((content) => {
        let status = "not-started";
        let lastPosition = 0;
        
        // Check if this content has progress
        const progress = contentProgressMap.get(content.id);
        
        // Check if this is an assignment with submission
        const assignmentSubmission = assignmentSubmissionMap.get(content.id);
        
        if (progress) {
          lastPosition = progress.lastPosition || 0;
          if (progress.isCompleted) {
            status = "completed";
            completedLessons++;
          } else if (progress.lastPosition && progress.lastPosition > 0) {
            status = "in-progress";
          }
        } 
        // If it's an assignment and has a submission, mark as completed
        else if (content.type === "assignment" && assignmentSubmission) {
          status = "completed";
          completedLessons++;
          console.log(`Assignment ${content.title} marked completed via submission`);
        }
        
        totalLessons++;
        
        return {
          id: content.id,
          type: content.type,
          title: content.title,
          duration: content.duration,
          fileUrl: content.fileUrl,
          thumbnailUrl: content.thumbnailUrl,
          description: content.description,
          status: status,
          lastPosition: lastPosition,
          hasSubmitted: content.type === "assignment" && !!assignmentSubmission,
          submissionId: assignmentSubmission ? null : undefined
        };
      });

      // Calculate if module is completed (all content completed)
      const moduleCompleted = materials.length > 0 && 
        materials.every(material => material.status === "completed");

      return {
        id: module.id,
        title: module.title,
        description: module.description,
        order: module.order,
        lessons: module.contents.length,
        completed: moduleCompleted,
        materials: materials
      };
    });

    // Calculate overall progress percentage
    const overallProgress = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

    console.log(`Progress: ${completedLessons}/${totalLessons} lessons completed (${overallProgress}%)`);

    res.json({
      success: true,
      programName: student.programName,
      studentName: student.fullName,
      studentEmail: student.email,
      progress: overallProgress,
      modules: formattedModules,
      stats: {
        totalModules: modules.length,
        totalLessons: totalLessons,
        completedLessons: completedLessons
      }
    });

  } catch (error) {
    console.error("Error fetching student course content:", error);
    res.status(500).json({ error: "Failed to fetch course content" });
  }
}); 

// =====================
// GET STUDENT COURSE CONTENT BY PROGRAM NAME (Alternative)
// ✅ PROTECT THIS ROUTE
router.get("/student/course-content/:programName", checkStudentActive, async (req: AuthRequest, res: Response) => {
  try {
    const { programName } = req.params;
    const { email } = req.query;

    // ✅ FIXED: Properly extract email as string
    const studentEmail = typeof email === 'string' ? email : (Array.isArray(email) ? email[0] : null);

    // Find the student to verify enrollment
    if (studentEmail) {
      const student = await prisma.student.findUnique({
        where: { email: studentEmail as string },
        select: { programName: true }
      });

      if (!student || student.programName !== programName) {
        return res.status(403).json({ error: "Student not enrolled in this program" });
      }
    }

    // ✅ FIXED: Properly typed programName as string
    const modules = await prisma.module.findMany({
      where: {
        programName: programName as string,
        status: "published"
      },
      include: {
        contents: {
          where: {
            status: "published"
          },
          orderBy: { order: "asc" }
        }
      },
      orderBy: { order: "asc" }
    });

    const formattedModules = modules.map((module) => ({
      id: module.id,
      title: module.title,
      description: module.description,
      order: module.order,
      lessons: module.contents.length,
      materials: module.contents.map((content) => ({
        id: content.id,
        type: content.type,
        title: content.title,
        duration: content.duration,
        fileUrl: content.fileUrl,
        thumbnailUrl: content.thumbnailUrl,
        description: content.description
      }))
    }));

    res.json({
      success: true,
      programName,
      modules: formattedModules
    });

  } catch (error) {
    console.error("Error fetching course content by program:", error);
    res.status(500).json({ error: "Failed to fetch course content" });
  }
});

// =====================
// GET ALL PROGRAMS FOR STUDENT ENROLLMENT
// ✅ PROTECT THIS ROUTE
router.get("/student/programs", checkStudentActive, async (req: AuthRequest, res: Response) => {
  try {
    const programs = await prisma.program.findMany({
      where: {
        courses: {
          some: {
            isPublished: true
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        courses: {
          where: { isPublished: true },
          select: {
            id: true,
            name: true,
            description: true,
            thumbnail: true,
            level: true,
            duration: true
          }
        }
      },
      orderBy: { name: "asc" }
    });

    res.json({ success: true, programs });
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
});



export default router;