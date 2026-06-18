import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Helper function to parse video duration string to seconds
 * Supports formats: "HH:MM:SS", "MM:SS", or seconds as number
 */
function parseDurationToSeconds(duration: string | null | undefined): number {
  if (!duration) return 0;
  
  // If it's already a number in string format
  if (/^\d+$/.test(duration)) {
    return parseInt(duration);
  }
  
  const parts = duration.split(':').map(Number);
  
  if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    // Just seconds
    return parts[0];
  }
  
  return 0;
}

/**
 * Helper function to find or create enrollment for a student and course
 */
async function findOrCreateEnrollment(studentId: number, courseId: number) {
  let enrollment = await prisma.enrollment.findFirst({
    where: {
      studentId: studentId,
      courseId: courseId,
    },
  });

  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        studentId: studentId,
        courseId: courseId,
        status: "in_progress",
        lastAccessed: new Date(),
        progress: 0,
      },
    });
  }

  return enrollment;
}

/**
 * Helper function to update enrollment progress percentage
 */
async function updateEnrollmentProgress(enrollmentId: number, courseId: number) {
  // Get all content progress for this enrollment
  const allProgress = await prisma.contentProgress.findMany({
    where: { enrollmentId: enrollmentId },
  });

  // Get total content count for this course
  const totalContentInCourse = await prisma.courseContent.count({
    where: { courseId: courseId },
  });

  const completedCount = allProgress.filter((p) => p.isCompleted).length;
  const progressPercent = totalContentInCourse > 0
    ? Math.round((completedCount / totalContentInCourse) * 100)
    : 0;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progress: progressPercent,
      status: progressPercent === 100 ? "completed" : "in_progress",
      completedAt: progressPercent === 100 ? new Date() : null,
      lastAccessed: new Date(),
    },
  });

  return progressPercent;
}

// =========================================
// SAVE / UPDATE VIDEO PROGRESS
// =========================================
router.post("/progress", async (req, res) => {
  try {
    const { email, contentId, lastPosition, isCompleted } = req.body;

    if (!email || !contentId) {
      return res.status(400).json({
        error: "email and contentId are required",
      });
    }

    // Get student
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get content with course relation
    const content = await prisma.courseContent.findUnique({
      where: { id: parseInt(contentId) },
      include: {
        course: true,
      },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Get the course - content must have a courseId
    if (!content.courseId) {
      return res.status(400).json({ error: "Content is not associated with a course" });
    }

    // Find or create enrollment
    const enrollment = await findOrCreateEnrollment(student.id, content.courseId);

    // Determine if video is completed
    let completed = isCompleted === true;
    
    // If not explicitly completed, check based on watch percentage
    if (!completed && content.duration && lastPosition) {
      const totalSeconds = parseDurationToSeconds(content.duration);
      if (totalSeconds > 0) {
        const watchPercentage = (lastPosition / totalSeconds) * 100;
        // Mark as completed if watched 90% or more
        if (watchPercentage >= 90) {
          completed = true;
        }
      }
    }

    // Get existing progress to check if status changed
    const existingProgress = await prisma.contentProgress.findUnique({
      where: {
        enrollmentId_contentId: {
          enrollmentId: enrollment.id,
          contentId: parseInt(contentId),
        },
      },
    });

    // Upsert content progress
    const progress = await prisma.contentProgress.upsert({
      where: {
        enrollmentId_contentId: {
          enrollmentId: enrollment.id,
          contentId: parseInt(contentId),
        },
      },
      update: {
        lastPosition: lastPosition !== undefined ? lastPosition : (existingProgress?.lastPosition || 0),
        isCompleted: completed,
        completedAt: completed && !existingProgress?.isCompleted ? new Date() : existingProgress?.completedAt,
        updatedAt: new Date(),
      },
      create: {
        enrollmentId: enrollment.id,
        contentId: parseInt(contentId),
        lastPosition: lastPosition || 0,
        isCompleted: completed,
        completedAt: completed ? new Date() : null,
      },
    });

    // Update enrollment progress percentage
    await updateEnrollmentProgress(enrollment.id, content.courseId);

    console.log(`✅ Progress saved for student ${email}: content ${contentId} - ${completed ? 'completed' : `${lastPosition || 0}s watched`}`);

    return res.json({
      success: true,
      progress: {
        lastPosition: progress.lastPosition,
        isCompleted: progress.isCompleted,
        id: progress.id,
      },
    });
  } catch (error) {
    console.error("Error saving video progress:", error);
    return res.status(500).json({
      error: "Failed to save video progress",
    });
  }
});

// =========================================
// GET VIDEO PROGRESS
// =========================================
router.get("/progress/:email/:contentId", async (req, res) => {
  try {
    const { email, contentId } = req.params;

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            contentProgress: {
              where: { contentId: parseInt(contentId) },
            },
          },
        },
      },
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
      progress: foundProgress
        ? {
            lastPosition: foundProgress.lastPosition || 0,
            isCompleted: foundProgress.isCompleted,
            id: foundProgress.id,
          }
        : null,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.json({ success: true, progress: null });
  }
});

// =========================================
// GET ALL PROGRESS FOR STUDENT
// =========================================
router.get("/student/:email/all", async (req, res) => {
  try {
    const { email } = req.params;

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            contentProgress: true,
          },
        },
      },
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
          isCompleted: progress.isCompleted,
        });
      }
    }

    res.json({ progresses: allProgress });
  } catch (error) {
    console.error("Error fetching all progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// =========================================
// MARK DOCUMENT/ASSIGNMENT AS COMPLETED
// =========================================
router.post("/content/mark-completed", async (req, res) => {
  try {
    const { email, contentId, isCompleted } = req.body;

    if (!email || !contentId) {
      return res.status(400).json({ error: "email and contentId are required" });
    }

    // Get student
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get content with course relation
    const content = await prisma.courseContent.findUnique({
      where: { id: parseInt(contentId) },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Get the course - content must have a courseId
    if (!content.courseId) {
      return res.status(400).json({ error: "Content is not associated with a course" });
    }

    // Find or create enrollment
    const enrollment = await findOrCreateEnrollment(student.id, content.courseId);

    // Get existing progress to check if status changed
    const existingProgress = await prisma.contentProgress.findUnique({
      where: {
        enrollmentId_contentId: {
          enrollmentId: enrollment.id,
          contentId: parseInt(contentId),
        },
      },
    });

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
        completedAt: isCompleted && !existingProgress?.isCompleted ? new Date() : existingProgress?.completedAt,
        updatedAt: new Date(),
      },
      create: {
        enrollmentId: enrollment.id,
        contentId: parseInt(contentId),
        isCompleted: isCompleted || false,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    // Update enrollment progress percentage
    await updateEnrollmentProgress(enrollment.id, content.courseId);

    console.log(`✅ Content marked ${isCompleted ? 'completed' : 'incomplete'} for student ${email}: content ${contentId}`);

    return res.json({
      success: true,
      progress: {
        isCompleted: progress.isCompleted,
        id: progress.id,
      },
    });
  } catch (error) {
    console.error("Error marking content completed:", error);
    return res.status(500).json({
      error: "Failed to mark content completed",
    });
  }
});

// =========================================
// GET CONTENT COMPLETION STATUS
// =========================================
router.get("/content/status/:email/:contentId", async (req, res) => {
  try {
    const { email, contentId } = req.params;

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            contentProgress: {
              where: { contentId: parseInt(contentId) },
            },
          },
        },
      },
    });

    if (!student) {
      return res.json({ success: true, isCompleted: false });
    }

    let isCompleted = false;
    let lastPosition = 0;
    
    for (const enrollment of student.enrollments) {
      if (enrollment.contentProgress.length > 0) {
        isCompleted = enrollment.contentProgress[0].isCompleted;
        lastPosition = enrollment.contentProgress[0].lastPosition || 0;
        break;
      }
    }

    return res.json({
      success: true,
      isCompleted: isCompleted,
      lastPosition: lastPosition,
    });
  } catch (error) {
    console.error("Error fetching content status:", error);
    return res.json({ success: true, isCompleted: false });
  }
});

export default router;