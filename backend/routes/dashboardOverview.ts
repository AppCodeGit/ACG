import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ==============================
// DASHBOARD OVERVIEW STATS
// ==============================
router.get("/stats", async (req: Request, res: Response) => {
  try {
    // Get current date for time-based calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Parallel queries for better performance
    const [
      // Student Stats
      totalStudents,
      activeStudents,
      inactiveStudents,
      studentsWithEnrollments,
      
      // Course Stats
      totalCourses,
      publishedCourses,
      draftCourses,
      archivedCourses,
      totalEnrollments,
      completedEnrollments,
      inProgressEnrollments,
      
      // Payment Stats
      totalRevenue,
      monthlyRevenue,
      weeklyRevenue,
      completedPayments,
      pendingPayments,
      successfulPaymentsCount,
      averagePayment,
      
      // Program Stats
      totalPrograms,
      programsWithCourses,
      
      // Content Stats
      totalContentItems,
      publishedContent,
      totalAssignments,
      submittedAssignments,
      gradedAssignments,
      
      // Recent Activity (last 5 items each)
      recentStudents,
      recentPayments,
      recentCourses,
      recentEnrollments,
      
      // Assignment Notifications
      unreadNotifications,
      
      // Gender Distribution
      genderDistribution,
      
      // Top Courses by Enrollment
      topCourses,
      
    ] = await Promise.all([
      // Student Stats
      prisma.student.count(),
      prisma.student.count({
        where: {
          user: {
            isActive: true
          }
        }
      }),
      prisma.student.count({
        where: {
          user: {
            isActive: false
          }
        }
      }),
      prisma.student.count({
        where: {
          enrollments: {
            some: {}
          }
        }
      }),
      
      // Course Stats
      prisma.course.count(),
      prisma.course.count({ where: { status: "published", isPublished: true } }),
      prisma.course.count({ where: { status: "draft" } }),
      prisma.course.count({ where: { status: "archived" } }),
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: "completed" } }),
      prisma.enrollment.count({ where: { status: "in_progress" } }),
      
      // Payment Stats
      prisma.payment.aggregate({
        _sum: { amountPaid: true },
        where: { status: { in: ["paid", "success", "manual"] } }
      }),
      prisma.payment.aggregate({
        _sum: { amountPaid: true },
        where: {
          status: { in: ["paid", "success", "manual"] },
          createdAt: { gte: startOfMonth }
        }
      }),
      prisma.payment.aggregate({
        _sum: { amountPaid: true },
        where: {
          status: { in: ["paid", "success", "manual"] },
          createdAt: { gte: startOfWeek }
        }
      }),
      prisma.payment.count({
        where: { status: { in: ["paid", "success", "manual"] } }
      }),
      prisma.payment.count({
        where: { status: "pending" }
      }),
      prisma.payment.count({
        where: { status: { in: ["paid", "success", "manual"] } }
      }),
      prisma.payment.aggregate({
        _avg: { amountPaid: true },
        where: { status: { in: ["paid", "success", "manual"] } }
      }),
      
      // Program Stats
      prisma.program.count(),
      prisma.program.count({
        where: {
          courses: {
            some: {}
          }
        }
      }),
      
      // Content Stats
      prisma.courseContent.count(),
      prisma.courseContent.count({ where: { status: "published" } }),
      prisma.courseContent.count({ where: { type: "assignment" } }),
      prisma.assignmentSubmission.count({ where: { status: "submitted" } }),
      prisma.assignmentSubmission.count({ where: { status: "graded" } }),
      
      // Recent Students (last 5)
      prisma.student.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true,
        }
      }),
      
      // Recent Payments (last 5)
      prisma.payment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        where: { status: { in: ["paid", "success", "manual"] } },
        select: {
          id: true,
          amountPaid: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          status: true,
        }
      }),
      
      // Recent Courses (last 5)
      prisma.course.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
        }
      }),
      
      // Recent Enrollments (last 5)
      prisma.enrollment.findMany({
        take: 5,
        orderBy: { enrolledAt: "desc" },
        include: {
          student: {
            select: { fullName: true }
          },
          course: {
            select: { name: true }
          }
        }
      }),
      
      // Unread Assignment Notifications
      prisma.assignmentNotification.count({
        where: { read: false }
      }),
      
      // Gender Distribution
      prisma.student.groupBy({
        by: ["gender"],
        _count: true,
      }),
      
      // Top 5 Courses by Enrollment
      prisma.course.findMany({
        take: 5,
        orderBy: {
          enrollments: {
            _count: "desc"
          }
        },
        include: {
          _count: {
            select: { enrollments: true }
          }
        }
      }),
    ]);

    // Format gender distribution
    const genderStats = {
      male: 0,
      female: 0,
      other: 0,
    };
    genderDistribution.forEach(g => {
      if (g.gender === "male") genderStats.male = g._count;
      if (g.gender === "female") genderStats.female = g._count;
      if (g.gender === "other") genderStats.other = g._count;
    });

    // Format recent activity
    const recentActivity = [
      ...recentStudents.map(s => ({
        id: `student-${s.id}`,
        type: "student",
        icon: "bi-person-plus",
        color: "success",
        title: "New Student Registration",
        description: `${s.fullName} (${s.email})`,
        time: s.createdAt,
        action: "registered"
      })),
      ...recentPayments.map(p => ({
        id: `payment-${p.id}`,
        type: "payment",
        icon: "bi-currency-dollar",
        color: "primary",
        title: "Payment Received",
        description: `${p.firstName || ""} ${p.lastName || ""} - $${p.amountPaid?.toLocaleString()}`,
        time: p.createdAt,
        action: "paid"
      })),
      ...recentCourses.map(c => ({
        id: `course-${c.id}`,
        type: "course",
        icon: "bi-book",
        color: "info",
        title: c.status === "published" ? "New Course Published" : "New Course Created",
        description: c.name,
        time: c.createdAt,
        action: c.status === "published" ? "published" : "created"
      })),
      ...recentEnrollments.map(e => ({
        id: `enrollment-${e.id}`,
        type: "enrollment",
        icon: "bi-person-check",
        color: "warning",
        title: "New Course Enrollment",
        description: `${e.student.fullName} enrolled in ${e.course.name}`,
        time: e.enrolledAt,
        action: "enrolled"
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
     .slice(0, 10); // Get top 10 most recent

    res.json({
      success: true,
      data: {
        // Student Section
        students: {
          total: totalStudents,
          active: activeStudents,
          inactive: inactiveStudents,
          withEnrollments: studentsWithEnrollments,
          withoutEnrollments: totalStudents - studentsWithEnrollments,
          genderDistribution: genderStats,
        },
        
        // Course Section
        courses: {
          total: totalCourses,
          published: publishedCourses,
          draft: draftCourses,
          archived: archivedCourses,
          topCourses: topCourses.map(c => ({
            id: c.id,
            name: c.name,
            enrollmentCount: c._count.enrollments
          })),
        },
        
        // Enrollment Section
        enrollments: {
          total: totalEnrollments,
          completed: completedEnrollments,
          inProgress: inProgressEnrollments,
          completionRate: totalEnrollments > 0 
            ? ((completedEnrollments / totalEnrollments) * 100).toFixed(1)
            : 0,
        },
        
        // Payment/Revenue Section
        revenue: {
          total: totalRevenue._sum.amountPaid || 0,
          monthly: monthlyRevenue._sum.amountPaid || 0,
          weekly: weeklyRevenue._sum.amountPaid || 0,
          completedPayments: completedPayments,
          pendingPayments: pendingPayments,
          averagePayment: averagePayment._avg.amountPaid || 0,
          successRate: (completedPayments + pendingPayments) > 0
            ? ((completedPayments / (completedPayments + pendingPayments)) * 100).toFixed(1)
            : 0,
        },
        
        // Program Section
        programs: {
          total: totalPrograms,
          withCourses: programsWithCourses,
          empty: totalPrograms - programsWithCourses,
        },
        
        // Content Section
        content: {
          total: totalContentItems,
          published: publishedContent,
          assignments: totalAssignments,
          submittedAssignments: submittedAssignments,
          gradedAssignments: gradedAssignments,
          pendingGrading: submittedAssignments - gradedAssignments,
        },
        
        // Notifications
        notifications: {
          unreadAssignmentNotifications: unreadNotifications,
        },
        
        // Recent Activity
        recentActivity,
      }
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch dashboard statistics" 
    });
  }
});

export default router;