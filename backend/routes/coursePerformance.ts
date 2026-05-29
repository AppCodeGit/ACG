import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ==============================
// GET COURSE PERFORMANCE DATA
// ==============================
router.get("/:email", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    
    // Get student
    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                program: true,
                content: {
                  where: { type: "assignment" }
                }
              }
            },
            contentProgress: true
          }
        },
        assignmentSubmissions: {
          include: {
            student: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Calculate overall stats
    let totalScore = 0;
    let gradedSubmissions = 0;
    
    for (const submission of student.assignmentSubmissions) {
      if (submission.grade !== null) {
        totalScore += submission.grade;
        gradedSubmissions++;
      }
    }
    
    const averageScore = gradedSubmissions > 0 ? Math.round(totalScore / gradedSubmissions) : 0;
    
    // Calculate completion rate from enrollments
    let totalProgress = 0;
    let totalCourses = student.enrollments.length;
    
    for (const enrollment of student.enrollments) {
      totalProgress += enrollment.progress;
    }
    
    const completionRate = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
    
    // Calculate class rank
    const allStudents = await prisma.student.findMany({
      include: {
        assignmentSubmissions: {
          where: { grade: { not: null } }
        }
      }
    });
    
    const studentAverages: { id: number; avg: number }[] = [];
    
    for (const s of allStudents) {
      let sum = 0;
      let count = 0;
      for (const sub of s.assignmentSubmissions) {
        if (sub.grade !== null) {
          sum += sub.grade;
          count++;
        }
      }
      const avg = count > 0 ? sum / count : 0;
      studentAverages.push({ id: s.id, avg });
    }
    
    studentAverages.sort((a, b) => b.avg - a.avg);
    const rank = studentAverages.findIndex(s => s.id === student.id) + 1;
    const totalStudents = allStudents.length;
    
    // Get courses with progress and grades
    const courses = [];
    
    for (const enrollment of student.enrollments) {
      const courseSubmissions = student.assignmentSubmissions.filter(
        sub => sub.assignmentId.toString().includes(enrollment.course.id.toString())
      );
      
      let courseGradeSum = 0;
      let courseGradeCount = 0;
      for (const sub of courseSubmissions) {
        if (sub.grade !== null) {
          courseGradeSum += sub.grade;
          courseGradeCount++;
        }
      }
      
      const courseAverage = courseGradeCount > 0 ? Math.round(courseGradeSum / courseGradeCount) : 0;
      const letterGrade = getLetterGrade(courseAverage);
      
      // Count assignments for this course
      const courseAssignments = enrollment.course.content.filter(c => c.type === "assignment");
      const completedAssignments = courseSubmissions.filter(s => s.status === "graded" || s.grade !== null).length;
      
      courses.push({
        id: enrollment.course.id,
        title: enrollment.course.name,
        programName: enrollment.course.program?.name || "General",
        progress: enrollment.progress,
        grade: letterGrade,
        score: courseAverage,
        assignmentsCompleted: completedAssignments,
        totalAssignments: courseAssignments.length,
        lastActivity: enrollment.lastAccessed
      });
    }
    
    // Get progress history (last 6 months)
    const progressHistory = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = months[monthDate.getMonth()];
      const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
      
      // Get content completed in this month
      const completedContent = await prisma.contentProgress.count({
        where: {
          enrollment: { studentId: student.id },
          isCompleted: true,
          completedAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      });
      
      // Get average score for assignments completed this month
      const monthSubmissions = await prisma.assignmentSubmission.findMany({
        where: {
          studentId: student.id,
          grade: { not: null },
          gradedAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      });
      
      let monthScore = 0;
      for (const sub of monthSubmissions) {
        if (sub.grade) monthScore += sub.grade;
      }
      const avgScore = monthSubmissions.length > 0 ? Math.round(monthScore / monthSubmissions.length) : 0;
      
      progressHistory.push({
        month: monthName,
        progress: Math.min(100, Math.round((completedContent / 20) * 100)), // Normalize
        score: avgScore
      });
    }
    
    // Get assignment performance with class averages
    const assignmentPerformance = [];
    const allSubmissions = await prisma.assignmentSubmission.findMany({
      where: { grade: { not: null } },
      include: { student: true }
    });
    
    // Group submissions by assignmentId
    const assignmentGroups = new Map();
    for (const sub of allSubmissions) {
      if (!assignmentGroups.has(sub.assignmentId)) {
        assignmentGroups.set(sub.assignmentId, []);
      }
      assignmentGroups.get(sub.assignmentId).push(sub);
    }
    
    for (const submission of student.assignmentSubmissions) {
      if (submission.grade !== null) {
        const group = assignmentGroups.get(submission.assignmentId) || [];
        let classSum = 0;
        for (const g of group) {
          if (g.grade) classSum += g.grade;
        }
        const classAverage = group.length > 0 ? Math.round(classSum / group.length) : 0;
        
        assignmentPerformance.push({
          name: `Assignment ${submission.assignmentId}`,
          score: Math.round(submission.grade),
          average: classAverage,
          type: "assignment",
          feedback: submission.feedback
        });
      }
    }
    
    // Sort by score descending and take top 6
    assignmentPerformance.sort((a, b) => b.score - a.score);
    
    // Get weekly content completion (last 7 days)
    const weeklyActivity = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      
      const completedCount = await prisma.contentProgress.count({
        where: {
          enrollment: { studentId: student.id },
          isCompleted: true,
          completedAt: {
            gte: dayStart,
            lt: dayEnd
          }
        }
      });
      
      weeklyActivity.push({
        day: days[date.getDay()],
        completed: completedCount
      });
    }
    
    // Generate recommendations based on weak areas
    const recommendations = [];
    
    // Find lowest scoring assignment type
    const weakAssignments = assignmentPerformance.filter(a => a.score < a.average);
    if (weakAssignments.length > 0) {
      recommendations.push({
        icon: "📚",
        title: "Review Weak Areas",
        description: `Your score on ${weakAssignments[0].name} was ${weakAssignments[0].score}% vs class average of ${weakAssignments[0].average}%. Focus on reviewing this topic.`,
        action: "Review Now"
      });
    }
    
    // Find courses with low progress
    const lowProgressCourses = courses.filter(c => c.progress < 50);
    if (lowProgressCourses.length > 0) {
      recommendations.push({
        icon: "⏰",
        title: "Catch Up on Course Work",
        description: `You're behind in ${lowProgressCourses[0].title}. Try to complete ${20 - lowProgressCourses[0].progress}% more to get back on track.`,
        action: "Continue Learning"
      });
    } else {
      recommendations.push({
        icon: "🎯",
        title: "Maintain Your Momentum",
        description: "You're doing great! Keep up with your daily study routine to maintain your high performance.",
        action: "Keep Going"
      });
    }
    
    // Add general recommendation
    recommendations.push({
      icon: "💡",
      title: "Practice Consistently",
      description: "Students who study 30 minutes daily score 25% higher on average. Try to establish a daily study habit.",
      action: "Set Reminder"
    });
    
    res.json({
      success: true,
      data: {
        overallStats: {
          averageScore,
          completionRate,
          rank,
          totalStudents
        },
        courses,
        progressHistory,
        assignmentPerformance: assignmentPerformance.slice(0, 6),
        weeklyActivity,
        recommendations
      }
    });
  } catch (err) {
    console.error("Course performance error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch course performance data" });
  }
});

function getLetterGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 87) return "A-";
  if (score >= 83) return "B+";
  if (score >= 80) return "B";
  if (score >= 77) return "B-";
  if (score >= 73) return "C+";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export default router;