// backend/routes/reports.ts - Updated version
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Helper function to get date range based on period
function getDateRange(period: string): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (period) {
    case "last7days":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "last30days":
      startDate.setDate(endDate.getDate() - 30);
      break;
    case "last90days":
      startDate.setDate(endDate.getDate() - 90);
      break;
    case "thisyear":
      startDate.setMonth(0, 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      startDate.setDate(endDate.getDate() - 30);
  }
  
  return { startDate, endDate };
}

// Helper function to get monthly data for a specific year
async function getMonthlyEnrollments(year: number) {
  const monthlyData = Array(12).fill(0);
  
  const enrollments = await prisma.enrollment.findMany({
    where: {
      enrolledAt: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
    select: {
      enrolledAt: true,
    },
  });
  
  enrollments.forEach(enrollment => {
    const month = enrollment.enrolledAt.getMonth();
    monthlyData[month]++;
  });
  
  return monthlyData;
}

router.get("/dashboard", async (req: Request, res: Response) => {
  try {
    const period = req.query.period as string || "last30days";
    const timeframe = req.query.timeframe as string || "monthly";
    
    const { startDate, endDate } = getDateRange(period);
    
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    
    // Get total students count
    const totalStudents = await prisma.student.count();
    
    // Get enrollments for current and previous year
    const currentYearEnrollments = await getMonthlyEnrollments(currentYear);
    const previousYearEnrollments = await getMonthlyEnrollments(previousYear);
    
    // Get all successful payments within date range
    const allPayments = await prisma.payment.findMany({
      where: {
        status: { in: ["paid", "success", "manual"] },
        paidAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amountPaid: true,
        courseId: true,
        semester: true,
        installment: true,
      },
    });
    
    // Calculate revenue by course
    const revenueMap = new Map<number, number>();
    allPayments.forEach(payment => {
      if (payment.courseId) {
        const current = revenueMap.get(payment.courseId) || 0;
        revenueMap.set(payment.courseId, current + (payment.amountPaid || 0));
      }
    });
    
    // Get course details
    const courseIds = Array.from(revenueMap.keys());
    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, name: true },
    });
    
    const courseMap = new Map();
    courses.forEach(course => courseMap.set(course.id, course.name));
    
    const revenueData = Array.from(revenueMap.entries()).map(([courseId, revenue]) => ({
      courseId,
      courseName: courseMap.get(courseId) || "Unknown Course",
      revenue,
    })).sort((a, b) => b.revenue - a.revenue);
    
    // Calculate total revenue
    const totalRevenue = allPayments.reduce((sum, p) => sum + (p.amountPaid || 0), 0);
    
    // Calculate revenue by semester
    const revenueBySemesterMap = new Map<string, number>();
    allPayments.forEach(payment => {
      if (payment.semester) {
        const current = revenueBySemesterMap.get(payment.semester) || 0;
        revenueBySemesterMap.set(payment.semester, current + (payment.amountPaid || 0));
      }
    });
    
    const revenueBySemester = Array.from(revenueBySemesterMap.entries()).map(([name, amount]) => ({ name, amount }));
    
    // Get course popularity
    const coursePopularity = await prisma.enrollment.groupBy({
      by: ['courseId'],
      where: { enrolledAt: { gte: startDate, lte: endDate } },
      _count: { studentId: true },
      orderBy: { _count: { studentId: 'desc' } },
      take: 10,
    });
    
    const popularCourseIds = coursePopularity.map(c => c.courseId);
    const popularCourses = await prisma.course.findMany({
      where: { id: { in: popularCourseIds } },
      select: { id: true, name: true },
    });
    
    const popularCourseMap = new Map();
    popularCourses.forEach(course => popularCourseMap.set(course.id, course.name));
    
    const popularityData = coursePopularity.map(item => ({
      courseId: item.courseId,
      courseName: popularCourseMap.get(item.courseId) || "Unknown Course",
      enrollments: item._count.studentId,
    }));
    
    // Calculate retention rate
    const totalEnrollments = await prisma.enrollment.count({
      where: { enrolledAt: { gte: startDate, lte: endDate } },
    });
    
    const completedEnrollments = await prisma.enrollment.count({
      where: {
        status: "completed",
        completedAt: { gte: startDate, lte: endDate },
      },
    });
    
    const retentionRate = totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0;
    
    // Calculate completion rate
    const enrollmentsWithContent = await prisma.enrollment.findMany({
      where: {
        enrolledAt: { gte: startDate, lte: endDate },
        course: { content: { some: {} } },
      },
      select: { id: true },
    });
    
    let completionRate = 0;
    if (enrollmentsWithContent.length > 0) {
      let totalCompletedContent = 0;
      let totalContentItems = 0;
      
      for (const enrollment of enrollmentsWithContent) {
        const contentCount = await prisma.courseContent.count({
          where: { course: { enrollments: { some: { id: enrollment.id } } } }
        });
        const completedCount = await prisma.contentProgress.count({
          where: { enrollmentId: enrollment.id, isCompleted: true },
        });
        totalCompletedContent += completedCount;
        totalContentItems += contentCount;
      }
      completionRate = totalContentItems > 0 ? (totalCompletedContent / totalContentItems) * 100 : 0;
    }
    
    // Get performance data
    let performanceData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    if (timeframe === "monthly") {
      for (let i = 0; i < 12; i++) {
        const monthEnrollments = await prisma.enrollment.count({
          where: {
            enrolledAt: {
              gte: new Date(currentYear, i, 1),
              lt: new Date(currentYear, i + 1, 1),
            },
          },
        });
        performanceData.push({ month: months[i], enrollments: monthEnrollments, completions: 0, retention: 0 });
      }
    } else if (timeframe === "quarterly") {
      const quarters = ['Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Oct-Dec)'];
      for (let i = 0; i < 4; i++) {
        const startMonth = i * 3;
        const endMonth = startMonth + 3;
        const quarterEnrollments = await prisma.enrollment.count({
          where: {
            enrolledAt: {
              gte: new Date(currentYear, startMonth, 1),
              lt: new Date(currentYear, endMonth, 1),
            },
          },
        });
        performanceData.push({ month: quarters[i], enrollments: quarterEnrollments, completions: 0, retention: 0 });
      }
    } else {
      for (let year = currentYear - 2; year <= currentYear; year++) {
        const yearEnrollments = await prisma.enrollment.count({
          where: {
            enrolledAt: {
              gte: new Date(year, 0, 1),
              lt: new Date(year + 1, 0, 1),
            },
          },
        });
        performanceData.push({ month: year.toString(), enrollments: yearEnrollments, completions: 0, retention: 0 });
      }
    }
    
    res.json({
      success: true,
      data: {
        enrollmentTrends: {
          currentYear: currentYearEnrollments,
          previousYear: previousYearEnrollments,
          labels: months,
        },
        revenueByCourse: revenueData,
        totalRevenue,
        revenueBySemester,
        coursePopularity: popularityData,
        retentionRate: retentionRate.toFixed(1),
        completionRate: completionRate.toFixed(1),
        performanceData,
        totalStudents,
        totalEnrollments,
        completedEnrollments,
      },
    });
  } catch (err) {
    console.error("Reports error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch reports data" });
  }
});

export default router;