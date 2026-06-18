import { Router, Request, Response } from "express";
import { PrismaClient, StudentNotificationType } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ==============================
// 1️⃣ GET STUDENT NOTIFICATIONS BY EMAIL
// ==============================
router.get("/:email", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    const { limit = 50, page = 1 } = req.query;
    
    // First find the student by email
    const student = await prisma.student.findUnique({
      where: { email },
      select: { id: true }
    });
    
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    
    const studentId = student.id;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const [notifications, total] = await Promise.all([
      prisma.studentNotification.findMany({
        where: { studentId },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit as string),
        skip
      }),
      prisma.studentNotification.count({ where: { studentId } })
    ]);
    
    const unreadCount = await prisma.studentNotification.count({
      where: { studentId, read: false }
    });
    
    res.json({
      success: true,
      data: notifications,
      unreadCount,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (err) {
    console.error("Error fetching student notifications:", err);
    res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
});

// ==============================
// 2️⃣ MARK NOTIFICATION AS READ
// ==============================
router.put("/:id/read", async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id));
    
    await prisma.studentNotification.update({
      where: { id },
      data: { read: true }
    });
    
    res.json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).json({ success: false, message: "Failed to mark as read" });
  }
});

// ==============================
// 3️⃣ MARK ALL NOTIFICATIONS AS READ BY EMAIL
// ==============================
router.put("/mark-all-read/:email", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    
    const student = await prisma.student.findUnique({
      where: { email },
      select: { id: true }
    });
    
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    
    await prisma.studentNotification.updateMany({
      where: { studentId: student.id, read: false },
      data: { read: true }
    });
    
    res.json({ success: true, message: "All notifications marked as read" });
  } catch (err) {
    console.error("Error marking all as read:", err);
    res.status(500).json({ success: false, message: "Failed to mark all as read" });
  }
});

// ==============================
// 4️⃣ DELETE NOTIFICATION
// ==============================
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id));
    
    await prisma.studentNotification.delete({ where: { id } });
    
    res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({ success: false, message: "Failed to delete notification" });
  }
});

// ==============================
// 5️⃣ CREATE NOTIFICATION (Internal function)
// ==============================
export async function createStudentNotification(
  studentId: number,
  type: StudentNotificationType,
  title: string,
  message: string,
  data?: any,
  req?: any
) {
  try {
    const notification = await prisma.studentNotification.create({
      data: {
        studentId,
        type,
        title,
        message,
        data: data || {},
        read: false
      }
    });
    
    if (req && req.app) {
      const io = req.app.get('io');
      if (io) {
        io.to(`student_${studentId}`).emit('new-student-notification', notification);
      }
    }
    
    console.log(`✅ Student notification created for student ${studentId}: ${title}`);
    return notification;
  } catch (err) {
    console.error("Error creating student notification:", err);
    return null;
  }
}

// ==============================
// 6️⃣ GET UNREAD COUNT BY EMAIL
// ==============================
router.get("/unread-count/:email", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    
    const student = await prisma.student.findUnique({
      where: { email },
      select: { id: true }
    });
    
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    
    const count = await prisma.studentNotification.count({
      where: { studentId: student.id, read: false }
    });
    
    res.json({ success: true, unreadCount: count });
  } catch (err) {
    console.error("Error getting unread count:", err);
    res.status(500).json({ success: false, message: "Failed to get unread count" });
  }
});

export default router;