import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * =========================================
 * SAVE / UPDATE VIDEO PROGRESS
 * =========================================
 */
router.post("/progress", async (req, res) => {
  try {
    const { email, contentId, lastPosition, isCompleted } = req.body;

    if (!email || !contentId) {
      return res.status(400).json({
        error: "email and contentId are required",
      });
    }

    // Get content with course relation
    const content = await prisma.courseContent.findUnique({
      where: { id: parseInt(contentId) },
      include: {
        course: true,
        module: true
      }
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Get student
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find or create course from content
    let course = content.course;
    
    if (!course && content.module) {
      // If content is linked to module, find course through module's program
      const program = await prisma.program.findFirst({
        where: { name: content.programName }
      });
      
      if (program) {
        course = await prisma.course.findFirst({
          where: { programId: program.id }
        });
        
        if (!course) {
          course = await prisma.course.create({
            data: {
              name: `${program.name} Course`,
              programId: program.id,
              isPublished: true,
              status: "published",
            },
          });
        }
      }
    }

    if (!course) {
      return res.status(404).json({ error: "No course associated with this content" });
    }

    // Find or create enrollment
    let enrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: student.id,
        courseId: course.id,
      },
    });

    if (!enrollment) {
      enrollment = await prisma.enrollment.create({
        data: {
          studentId: student.id,
          courseId: course.id,
          status: "in_progress",
          lastAccessed: new Date(),
        },
      });
    }

    // Calculate if completed based on video duration
    let completed = isCompleted;
    if (!completed && content.duration && lastPosition) {
      const durationParts = content.duration.split(':');
      let totalSeconds = 0;
      if (durationParts.length === 2) {
        totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
      } else if (durationParts.length === 3) {
        totalSeconds = parseInt(durationParts[0]) * 3600 + parseInt(durationParts[1]) * 60 + parseInt(durationParts[2]);
      }
      
      if (totalSeconds > 0) {
        const progressPercent = (lastPosition / totalSeconds) * 100;
        if (progressPercent >= 90) {
          completed = true;
        }
      }
    }

    // Upsert content progress
    const progress = await prisma.contentProgress.upsert({
      where: {
        enrollmentId_contentId: {
          enrollmentId: enrollment.id,
          contentId: parseInt(contentId),
        },
      },
      update: {
        lastPosition: lastPosition ?? 0,
        isCompleted: completed ?? false,
        completedAt: completed ? new Date() : undefined,
        updatedAt: new Date(),
      },
      create: {
        enrollmentId: enrollment.id,
        contentId: parseInt(contentId),
        lastPosition: lastPosition || 0,
        isCompleted: completed || false,
        completedAt: completed ? new Date() : null,
      },
    });

    // Update enrollment progress percentage
    const allProgress = await prisma.contentProgress.findMany({
      where: { enrollmentId: enrollment.id },
    });

    const totalContentInCourse = await prisma.courseContent.count({
      where: { 
        OR: [
          { courseId: course.id },
          { module: { programName: content.programName } }
        ]
      },
    });

    const completedCount = allProgress.filter((p) => p.isCompleted).length;
    const progressPercent = totalContentInCourse > 0
      ? Math.round((completedCount / totalContentInCourse) * 100)
      : 0;

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progress: progressPercent,
        status: progressPercent === 100 ? "completed" : "in_progress",
        completedAt: progressPercent === 100 ? new Date() : null,
        lastAccessed: new Date(),
      },
    });

    return res.json({
      success: true,
      progress: {
        lastPosition: progress.lastPosition,
        isCompleted: progress.isCompleted,
        id: progress.id
      },
    });
  } catch (error) {
    console.error("Error saving video progress:", error);
    return res.status(500).json({
      error: "Failed to save video progress",
    });
  }
});

/**
 * =========================================
 * GET VIDEO PROGRESS
 * =========================================
 */
router.get("/progress/:email/:contentId", async (req, res) => {
  try {
    const { email, contentId } = req.params;

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            contentProgress: {
              where: { contentId: parseInt(contentId) }
            }
          }
        }
      }
    });

    if (!student) {
      return res.json({ success: true, progress: null });
    }

    // Find progress from any enrollment
    let foundProgress = null;
    for (const enrollment of student.enrollments) {
      if (enrollment.contentProgress.length > 0) {
        foundProgress = enrollment.contentProgress[0];
        break;
      }
    }

    return res.json({
      success: true,
      progress: foundProgress ? {
        lastPosition: foundProgress.lastPosition,
        isCompleted: foundProgress.isCompleted,
        id: foundProgress.id
      } : null,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.json({ success: true, progress: null });
  }
});


// GET all progress for a student
router.get("/student/:email/all", async (req, res) => {
  try {
    const { email } = req.params;
    
    const student = await prisma.student.findUnique({
      where: { email },
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
    
    const allProgress = [];
    for (const enrollment of student.enrollments) {
      for (const progress of enrollment.contentProgress) {
        allProgress.push({
          contentId: progress.contentId,
          lastPosition: progress.lastPosition,
          isCompleted: progress.isCompleted
        });
      }
    }
    
    res.json({ progresses: allProgress });
  } catch (error) {
    console.error("Error fetching all progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});


// =====================
// MARK DOCUMENT AS VIEWED/COMPLETED
// =====================
router.post("/content/mark-completed", async (req, res) => {
  try {
    const { email, contentId, isCompleted } = req.body;

    if (!email || !contentId) {
      return res.status(400).json({ error: "email and contentId are required" });
    }

    // Get content with course relation
    const content = await prisma.courseContent.findUnique({
      where: { id: parseInt(contentId) },
      include: { course: true, module: true }
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Get student
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find or create course
    let course = content.course;
    
    if (!course && content.module) {
      const program = await prisma.program.findFirst({
        where: { name: content.programName }
      });
      
      if (program) {
        course = await prisma.course.findFirst({
          where: { programId: program.id }
        });
        
        if (!course) {
          course = await prisma.course.create({
            data: {
              name: `${program.name} Course`,
              programId: program.id,
              isPublished: true,
              status: "published",
            },
          });
        }
      }
    }

    if (!course) {
      return res.status(404).json({ error: "No course associated with this content" });
    }

    // Find or create enrollment
    let enrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: student.id,
        courseId: course.id,
      },
    });

    if (!enrollment) {
      enrollment = await prisma.enrollment.create({
        data: {
          studentId: student.id,
          courseId: course.id,
          status: "in_progress",
          lastAccessed: new Date(),
        },
      });
    }

    // Upsert content progress
    const progress = await prisma.contentProgress.upsert({
      where: {
        enrollmentId_contentId: {
          enrollmentId: enrollment.id,
          contentId: parseInt(contentId),
        },
      },
      update: {
        isCompleted: isCompleted || false,
        completedAt: isCompleted ? new Date() : undefined,
        updatedAt: new Date(),
      },
      create: {
        enrollmentId: enrollment.id,
        contentId: parseInt(contentId),
        isCompleted: isCompleted || false,
        completedAt: isCompleted ? new Date() : null,
        lastPosition: null, // Not applicable for documents/assignments
      },
    });

    // Update enrollment progress percentage
    const allProgress = await prisma.contentProgress.findMany({
      where: { enrollmentId: enrollment.id },
    });

    const totalContentInCourse = await prisma.courseContent.count({
      where: { 
        OR: [
          { courseId: course.id },
          { module: { programName: content.programName } }
        ]
      },
    });

    const completedCount = allProgress.filter((p) => p.isCompleted).length;
    const progressPercent = totalContentInCourse > 0
      ? Math.round((completedCount / totalContentInCourse) * 100)
      : 0;

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progress: progressPercent,
        status: progressPercent === 100 ? "completed" : "in_progress",
        completedAt: progressPercent === 100 ? new Date() : null,
        lastAccessed: new Date(),
      },
    });

    return res.json({
      success: true,
      progress: {
        isCompleted: progress.isCompleted,
        id: progress.id
      },
    });
  } catch (error) {
    console.error("Error marking content completed:", error);
    return res.status(500).json({
      error: "Failed to mark content completed",
    });
  }
});

// =====================
// GET CONTENT COMPLETION STATUS
// =====================
router.get("/content/status/:email/:contentId", async (req, res) => {
  try {
    const { email, contentId } = req.params;

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            contentProgress: {
              where: { contentId: parseInt(contentId) }
            }
          }
        }
      }
    });

    if (!student) {
      return res.json({ success: true, isCompleted: false });
    }

    let isCompleted = false;
    for (const enrollment of student.enrollments) {
      if (enrollment.contentProgress.length > 0) {
        isCompleted = enrollment.contentProgress[0].isCompleted;
        break;
      }
    }

    return res.json({
      success: true,
      isCompleted: isCompleted,
    });
  } catch (error) {
    console.error("Error fetching content status:", error);
    return res.json({ success: true, isCompleted: false });
  }
});
export default router;