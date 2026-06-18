import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Helper: Convert percentage to letter grade
function getLetterGrade(percentage: number): string {
  if (percentage >= 90) return "A";
  if (percentage >= 87) return "A-";
  if (percentage >= 83) return "B+";
  if (percentage >= 80) return "B";
  if (percentage >= 77) return "B-";
  if (percentage >= 73) return "C+";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}

// Helper: Get grade points from letter grade
function getGradePoints(grade: string): number {
  const points: Record<string, number> = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0,
    "B-": 2.7, "C+": 2.3, "C": 2.0, "D": 1.0, "F": 0.0
  };
  return points[grade] || 0;
}

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
                program: true
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

    // Get final grade if exists
    const finalGrade = await prisma.finalGrade.findUnique({
      where: { studentId_programName: { studentId: student.id, programName: student.programName || "" } }
    });

    // Group submissions by course
    const courseSubmissions = new Map();
    
    for (const submission of student.assignmentSubmissions) {
      // Find which course this assignment belongs to
      for (const enrollment of student.enrollments) {
        const courseContent = await prisma.courseContent.findFirst({
          where: {
            courseId: enrollment.courseId,
            type: "assignment"
          }
        });
        
        if (courseContent) {
          const key = enrollment.courseId;
          if (!courseSubmissions.has(key)) {
            courseSubmissions.set(key, []);
          }
          if (submission.grade !== null) {
            courseSubmissions.get(key).push(submission.grade);
          }
        }
      }
    }

    // Calculate courses with grades
    const courses = [];
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    for (const enrollment of student.enrollments) {
      const courseGrades = courseSubmissions.get(enrollment.courseId) || [];
      const averageScore = courseGrades.length > 0 
        ? courseGrades.reduce((a, b) => a + b, 0) / courseGrades.length 
        : 0;
      
      const letterGrade = getLetterGrade(averageScore);
      const gradePoints = getGradePoints(letterGrade);
      const credits = enrollment.course.credits || 3; // Default 3 credits
      
      courses.push({
        id: enrollment.course.id,
        code: enrollment.course.name.substring(0, 7),
        name: enrollment.course.name,
        credits,
        grade: letterGrade,
        points: gradePoints,
        averageScore: Math.round(averageScore),
        assignments: [] // You can populate with actual assignments if needed
      });
      
      totalGradePoints += gradePoints * credits;
      totalCredits += credits;
    }
    
    const overallGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    
    // Group by semester (simplified - group by year)
    const semesters = [];
    const semesterMap = new Map();
    
    for (const enrollment of student.enrollments) {
      const year = enrollment.enrolledAt.getFullYear();
      const semesterName = `${year} Semester ${enrollment.enrolledAt.getMonth() < 6 ? '1' : '2'}`;
      
      if (!semesterMap.has(semesterName)) {
        semesterMap.set(semesterName, []);
      }
      semesterMap.get(semesterName).push(enrollment);
    }
    
    let semesterIndex = 0;
    for (const [name, enrollments] of semesterMap) {
      let semesterTotalPoints = 0;
      let semesterTotalCredits = 0;
      const semesterCourses = [];
      
      for (const enrollment of enrollments) {
        const courseGrades = courseSubmissions.get(enrollment.courseId) || [];
        const averageScore = courseGrades.length > 0 
          ? courseGrades.reduce((a, b) => a + b, 0) / courseGrades.length 
          : 0;
        const letterGrade = getLetterGrade(averageScore);
        const gradePoints = getGradePoints(letterGrade);
        const credits = enrollment.course.credits || 3;
        
        semesterCourses.push({
          id: enrollment.course.id,
          code: enrollment.course.name.substring(0, 7),
          name: enrollment.course.name,
          instructor: enrollment.course.instructor?.toString() || "Staff",
          credits,
          grade: letterGrade,
          points: gradePoints,
          averageScore: Math.round(averageScore),
        });
        
        semesterTotalPoints += gradePoints * credits;
        semesterTotalCredits += credits;
      }
      
      const semesterGPA = semesterTotalCredits > 0 ? semesterTotalPoints / semesterTotalCredits : 0;
      const isCurrent = semesterIndex === semesterMap.size - 1;
      
      semesters.push({
        id: name.toLowerCase().replace(/ /g, "-"),
        name,
        gpa: semesterGPA,
        credits: semesterTotalCredits,
        status: isCurrent ? "current" : "completed",
        courses: semesterCourses
      });
      
      semesterIndex++;
    }
    
    // Calculate grade distribution
    const distribution = { A: 0, "A-": 0, "B+": 0, B: 0, "B-": 0, "C+": 0, C: 0, D: 0, F: 0 };
    for (const course of courses) {
      if (distribution[course.grade as keyof typeof distribution] !== undefined) {
        distribution[course.grade as keyof typeof distribution]++;
      }
    }
    
    // Calculate GPA progression
    const gpaProgression = semesters.map(s => ({
      semester: s.name.substring(2, 7),
      gpa: s.gpa
    }));
    
    res.json({
      success: true,
      data: {
        overallGPA,
        cumulativeCredits: totalCredits,
        completedCourses: courses.length,
        currentSemester: {
          name: semesters[semesters.length - 1]?.name || "Current",
          gpa: semesters[semesters.length - 1]?.gpa || 0,
          credits: semesters[semesters.length - 1]?.credits || 0,
          courses: semesters[semesters.length - 1]?.courses.length || 0
        },
        semesters,
        gradeDistribution: distribution,
        gpaProgression,
        finalGrade: finalGrade ? {
          id: finalGrade.id,
          programName: finalGrade.programName,
          projectTitle: finalGrade.projectTitle,
          projectScore: finalGrade.projectScore,
          weightedScore: finalGrade.weightedScore || finalGrade.projectScore,
          certificateIssued: finalGrade.certificateIssued,
          certificateUrl: finalGrade.certificateUrl
        } : null
      }
    });
    
  } catch (err) {
    console.error("Grades error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch grade data" });
  }
});

export default router;