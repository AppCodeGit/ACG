import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StudentNotificationType } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Helper function for student notifications
async function createStudentNotification(
  studentId: number,
  type: StudentNotificationType,  
  title: string,
  message: string,
  data?: any,
  req?: any,
) {
  try {
    const notification = await prisma.studentNotification.create({
      data: {
        studentId,
        type,
        title,
        message,
        data: data || {},
        read: false,
      },
    });

    if (req && req.app) {
      const io = req.app.get("io");
      if (io) {
        io.to(`student_${studentId}`).emit(
          "new-student-notification",
          notification,
        );
      }
    }

    console.log(`✅ Student notification created: ${title}`);
    return notification;
  } catch (err) {
    console.error("Error creating student notification:", err);
    return null;
  }
}

// ============================================
// ENROLL STUDENT IN COURSE
// ============================================
router.post("/enroll", async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res
        .status(400)
        .json({ error: "Student ID and Course ID are required" });
    }

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: studentId,
        courseId: courseId,
      },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ error: "Student already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: studentId,
        courseId: courseId,
        enrolledAt: new Date(),
        status: "enrolled",
        progress: 0,
      },
      include: {
        course: true,
        student: true,
      },
    });

    // ✅ CREATE STUDENT NOTIFICATION FOR ENROLLMENT
    await createStudentNotification(
      studentId,
      StudentNotificationType.COURSE_ENROLLMENT, // ← Use enum
      "Enrollment Confirmed",
      `You have been successfully enrolled in ${course.name}`,
      {
        courseId: course.id,
        courseName: course.name,
        enrollmentId: enrollment.id,
        enrolledAt: new Date(),
      },
      req,
    );

    res.json({
      success: true,
      message: `Student successfully enrolled in ${course.name}`,
      enrollment,
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: "Failed to enroll student" });
  }
});

// ============================================
// GET STUDENT ENROLLMENTS
// ============================================
router.get(
  "/student/:studentId/enrollments",
  async (req: Request, res: Response) => {
    try {
      const studentId = parseInt(String(req.params.studentId));
      const enrollments = await prisma.enrollment.findMany({
        where: { studentId },
        include: {
          course: true,
        },
        orderBy: { enrolledAt: "desc" },
      });

      res.json({
        success: true,
        enrollments,
      });
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ error: "Failed to fetch enrollments" });
    }
  },
);

export default router;
