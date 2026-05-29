import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const SUCCESS_STATUSES = ["paid", "success", "manual"];

// ==============================
// 1️⃣ ADMIN DASHBOARD STATS
// ==============================
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const [revenue, completed, pending, average] = await Promise.all([
      prisma.payment.aggregate({
        _sum: { amountPaid: true },
        where: { status: { in: SUCCESS_STATUSES } },
      }),
      prisma.payment.count({
        where: { status: { in: SUCCESS_STATUSES } },
      }),
      prisma.payment.count({
        where: { status: "pending" },
      }),
      prisma.payment.aggregate({
        _avg: { amountPaid: true },
        where: { status: { in: SUCCESS_STATUSES } },
      }),
    ]);

    res.json({
      totalRevenue: revenue._sum.amountPaid || 0,
      completedPayments: completed,
      pendingPayments: pending,
      averagePayment: average._avg.amountPaid || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

// ==============================
// 2️⃣ PAGINATED PAYMENTS LIST    
// ==============================
router.get("/", async (req: Request, res: Response) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;

    const payments = await prisma.payment.findMany({
      take: pageSize + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { createdAt: "desc" },
      include: {
        course: true,
      },
    });

    const hasNextPage = payments.length > pageSize;
    if (hasNextPage) payments.pop();

    // Get all unique emails from payments
    const uniqueEmails = [...new Set(payments.map(p => p.email).filter(Boolean))];
    
    // Fetch student profiles for all these emails
    const students = await prisma.student.findMany({
      where: {
        email: { in: uniqueEmails }
      },
      select: {
        email: true,
        phone: true,
        profileImage: true,
        fullName: true,
      }
    });

    // Create a map for quick lookup
    const studentMap = new Map();
    students.forEach(student => {
      studentMap.set(student.email, student);
    });

    // Also fetch users to get names (since User table has name field)
    const users = await prisma.user.findMany({
      where: {
        email: { in: uniqueEmails }
      },
      select: {
        email: true,
        name: true,
      }
    });
    
    const userMap = new Map();
    users.forEach(user => {
      userMap.set(user.email, user);
    });

    const formatted = payments.map((p) => {
      const student = studentMap.get(p.email);
      const user = userMap.get(p.email);
      
      // Get name: prefer from User table, then from Student fullName, then from payment firstName/lastName
      let name = "";
      if (user?.name) {
        name = user.name;
      } else if (student?.fullName) {
        name = student.fullName;
      } else {
        name = `${p.firstName || ""} ${p.lastName || ""}`.trim();
        if (!name) {
          name = p.email.split('@')[0];
        }
      }
      
      // Get phone from Student model
      const phone = student?.phone || "—";
      
      // Get profile image from Student model
      const avatar = student?.profileImage || null;
      
      // Build subtitle
      let subtitle = "";
      if (p.course) {
        subtitle = `${p.course.name} payment`;
      } else {
        subtitle = `${p.semester || "N/A"} - ${p.installment || "N/A"}`;
      }

      return {
        id: p.id,
        amount: p.amountPaid,
        status: p.status,
        date: p.createdAt,
        name: name,
        email: p.email,
        phone: phone,
        avatar: avatar,
        subtitle: subtitle,
      };
    });

    res.json({
      payments: formatted,
      nextCursor: hasNextPage ? payments[payments.length - 1].id : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
});

// ==============================
// 3️⃣ SINGLE PAYMENT DETAILS
// ==============================   
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const paymentId = Number(req.params.id);

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        course: true,
      },
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Fetch student profile by email
    let studentProfile = null;
    let user = null;
    
    if (payment.email) {
      studentProfile = await prisma.student.findUnique({
        where: { email: payment.email }
      });
      
      user = await prisma.user.findUnique({
        where: { email: payment.email }
      });
    }

    // Enhance response with student data
    const enhancedPayment = {
      ...payment,
      studentProfile: studentProfile,
      user: user,
    };

    res.json(enhancedPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch payment details" });
  }
});

// ==============================
// 4️⃣ RECORD MANUAL PAYMENT
// ==============================   
router.post("/manual", async (req: Request, res: Response) => {
  try {
    const { email, amountPaid, semester, installment, courseId, firstName, lastName } = req.body;

    // Try to find user by email to get userId
    let userId = null;
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email }
      });
      if (user) {
        userId = user.id;
      }
    }

    const payment = await prisma.payment.create({
      data: {
        userId: userId,
        email: email,
        amountPaid: amountPaid,
        semester: semester,
        installment: installment,
        courseId: courseId || null,
        firstName: firstName || null,
        lastName: lastName || null,
        status: "manual",
        paidAt: new Date(),
      },
    });

    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to record manual payment" });
  }
});

// ==============================
// 5️⃣ STUDENT TRANSACTION HISTORY
// ==============================
router.get("/student/:email", async (req: Request, res: Response) => {
  try {
    // Ensure email is a string, not an array
    const email = decodeURIComponent(String(req.params.email));
    
    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    // Fetch all payments for this student by email
    const transactions = await prisma.payment.findMany({
      where: {
        email: email,
      },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const formattedTransactions = transactions.map((t) => ({
      id: t.id,
      amount: t.amountPaid,
      status: t.status,
      date: t.createdAt,
      semester: t.semester,
      installment: t.installment,
      subtitle: t.course ? `${t.course.name} payment` : `${t.semester} - ${t.installment}`,
      courseName: t.course?.name,
    }));
    
    // Get student info from Student model
    const student = await prisma.student.findUnique({
      where: { email: email },
      select: {
        fullName: true,
        phone: true,
        profileImage: true,
      },
    });
    
    res.json({
      transactions: formattedTransactions,
      studentInfo: student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transaction history" });
  }
});

export default router;