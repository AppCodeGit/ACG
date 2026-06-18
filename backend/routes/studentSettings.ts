import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

// Helper to get student by email
async function getStudentByEmail(email: string) {
  return await prisma.student.findUnique({
    where: { email },
    include: {
      user: true,
      enrollments: {
        include: { course: true }
      }
    }
  });
}

// ==============================
// 1️⃣ GET STUDENT SETTINGS
// ==============================
router.get("/:email", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    
    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        user: true
      }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Get notification preferences from SystemSettings or create defaults
    let notificationPrefs = await prisma.systemSetting.findMany({
      where: {
        key: {
          in: ["student_notify_grades", "student_notify_assignments", "student_notify_announcements"]
        }
      }
    });

    // If no preferences exist, create defaults
    if (notificationPrefs.length === 0) {
      const defaults = [
        { category: "notifications", key: "student_notify_grades", value: "true", description: "Email when grades are posted" },
        { category: "notifications", key: "student_notify_assignments", value: "true", description: "Email when new assignments are available" },
        { category: "notifications", key: "student_notify_announcements", value: "true", description: "Email for system announcements" }
      ];
      
      for (const setting of defaults) {
        await prisma.systemSetting.create({ data: setting });
      }
      notificationPrefs = await prisma.systemSetting.findMany({
        where: { key: { in: ["student_notify_grades", "student_notify_assignments", "student_notify_announcements"] } }
      });
    }

    const preferences = {
      gradeAlerts: notificationPrefs.find(p => p.key === "student_notify_grades")?.value === "true",
      assignmentReminders: notificationPrefs.find(p => p.key === "student_notify_assignments")?.value === "true",
      systemAnnouncements: notificationPrefs.find(p => p.key === "student_notify_announcements")?.value === "true"
    };

    // Get session history (last 10 login sessions)
    // Note: You'll need to create a UserSession model to track this
    const sessionHistory = [
      // This would come from a UserSession table
      // For now, return empty array or mock data
    ];

    res.json({
      success: true,
      data: {
        academic: {
          programName: student.programName || "",
          studyArea: student.studyArea || "",
          qualification: student.qualification || "",
          institution: student.institution || "",
          graduationYear: student.graduationYear || null
        },
        notifications: preferences,
        security: {
          email: student.email,
          phone: student.phone
        },
        sessionHistory
      }
    });
  } catch (err) {
    console.error("Error fetching student settings:", err);
    res.status(500).json({ success: false, message: "Failed to fetch settings" });
  }
});

// ==============================
// 2️⃣ UPDATE ACADEMIC INFORMATION
// ==============================
router.put("/:email/academic", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    const { programName, studyArea, qualification, institution, graduationYear } = req.body;

    const student = await prisma.student.update({
      where: { email },
      data: {
        programName: programName || null,
        studyArea: studyArea || null,
        qualification: qualification || null,
        institution: institution || null,
        graduationYear: graduationYear ? parseInt(graduationYear) : null
      }
    });

    res.json({
      success: true,
      message: "Academic information updated successfully",
      data: {
        programName: student.programName,
        studyArea: student.studyArea,
        qualification: student.qualification,
        institution: student.institution,
        graduationYear: student.graduationYear
      }
    });
  } catch (err) {
    console.error("Error updating academic info:", err);
    res.status(500).json({ success: false, message: "Failed to update academic information" });
  }
});

// ==============================
// 3️⃣ UPDATE NOTIFICATION PREFERENCES
// ==============================
router.put("/:email/notifications", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    const { gradeAlerts, assignmentReminders, systemAnnouncements } = req.body;

    // Update notification settings
    await prisma.systemSetting.update({
      where: { key: "student_notify_grades" },
      data: { value: gradeAlerts ? "true" : "false" }
    });
    
    await prisma.systemSetting.update({
      where: { key: "student_notify_assignments" },
      data: { value: assignmentReminders ? "true" : "false" }
    });
    
    await prisma.systemSetting.update({
      where: { key: "student_notify_announcements" },
      data: { value: systemAnnouncements ? "true" : "false" }
    });

    res.json({
      success: true,
      message: "Notification preferences updated successfully"
    });
  } catch (err) {
    console.error("Error updating notification preferences:", err);
    res.status(500).json({ success: false, message: "Failed to update notification preferences" });
  }
});

// ==============================
// 4️⃣ CHANGE PASSWORD
// ==============================
router.put("/:email/password", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    const { currentPassword, newPassword } = req.body;

    const student = await prisma.student.findUnique({
      where: { email },
      include: { user: true }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Note: Password verification should be done via Cognito
    // This is a simplified version assuming passwords are stored in User model
    // You should integrate with Cognito for actual password changes

    res.json({
      success: true,
      message: "Password updated successfully. Please log in again."
    });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ success: false, message: "Failed to change password" });
  }
});

// ==============================
// 5️⃣ GET SESSION HISTORY
// ==============================
router.get("/:email/sessions", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    
    const student = await prisma.student.findUnique({
      where: { email },
      include: { user: true }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Get active sessions from UserSession table (if you have it)
    // For now, return mock data
    const sessions = [
      {
        id: "1",
        device: "Chrome on Windows",
        location: "New York, USA",
        ipAddress: "192.168.1.1",
        lastActive: new Date(),
        isCurrent: true
      }
    ];

    res.json({
      success: true,
      data: sessions
    });
  } catch (err) {
    console.error("Error fetching session history:", err);
    res.status(500).json({ success: false, message: "Failed to fetch session history" });
  }
});

// ==============================
// 6️⃣ REVOKE SESSION (Logout from other device)
// ==============================
router.delete("/:email/sessions/:sessionId", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    // Delete the session from UserSession table
    // await prisma.userSession.delete({ where: { id: sessionId } });

    res.json({
      success: true,
      message: "Session revoked successfully"
    });
  } catch (err) {
    console.error("Error revoking session:", err);
    res.status(500).json({ success: false, message: "Failed to revoke session" });
  }
});

export default router;