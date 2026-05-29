import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/student/profile/:email', async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        user: {
          select: {
            studentId: true,
            name: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
      email: student.email,
      programName: student.programName,
      phone: student.phone,
      nationality: student.nationality,
      fullName: student.fullName,
      profileImage: student.profileImage
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/student/student-id/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        studentId: true,
        name: true,
        email: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      studentId: user.studentId || null,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Error fetching student ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// FIXED: Changed route path from "/student-dashboard/student/:email" to "/student-dashboard/:email"
router.get("/student-dashboard/:email", async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(String(req.params.email));
    
    console.log("Fetching dashboard data for email:", email);
    
    // Get student with enrollments and course including program
    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                program: true,
                content: {
                  include: {
                    module: true
                  },
                  orderBy: { order: 'asc' }
                }
              }
            },
            contentProgress: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    console.log("Student found:", student.fullName);
    console.log("Enrollments count:", student.enrollments.length);

    // Calculate overall progress
    let totalProgress = 0;
    let totalCourses = student.enrollments.length;
    
    for (const enrollment of student.enrollments) {
      totalProgress += enrollment.progress;
      console.log(`Course: ${enrollment.course.name}, Progress: ${enrollment.progress}%, Status: ${enrollment.status}`);
    }
    
    const overallProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
    const completedCourses = student.enrollments.filter(e => e.status === "completed").length;
    
    console.log(`Overall Progress: ${overallProgress}%, Completed Courses: ${completedCourses}/${totalCourses}`);

    // Get current module
    let currentModule = null;
    let currentModuleContent = [];
    let nextModule = null;
    
    // First, find an enrollment that is in progress or enrolled
    const activeEnrollment = student.enrollments.find(
      e => e.status === "in_progress" || e.status === "enrolled"
    );
    
    if (activeEnrollment) {
      const course = activeEnrollment.course;
      const programName = course.program?.name;
      
      console.log("Active course:", course.name);
      console.log("Program name:", programName);
      
      if (programName) {
        // Find modules for this program
        const modules = await prisma.module.findMany({
          where: { programName: programName },
          include: {
            contents: {
              where: { courseId: course.id },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        });
        
        console.log(`Found ${modules.length} modules for program ${programName}`);
        
        // Find current module based on content progress
        for (let i = 0; i < modules.length; i++) {
          const module = modules[i];
          const moduleContents = module.contents;
          
          if (moduleContents.length === 0) continue;
          
          // Check if all contents in this module are completed
          const allCompleted = moduleContents.every(content => {
            return activeEnrollment.contentProgress.some(
              cp => cp.contentId === content.id && cp.isCompleted
            );
          });
          
          console.log(`Module ${module.title}: allCompleted = ${allCompleted}`);
          
          if (!allCompleted) {
            currentModule = module;
            currentModuleContent = moduleContents;
            
            if (i + 1 < modules.length) {
              nextModule = modules[i + 1];
            }
            break;
          }
        }
        
        // If all modules are completed, show the last module
        if (!currentModule && modules.length > 0) {
          currentModule = modules[modules.length - 1];
          currentModuleContent = currentModule.contents;
        }
      }
    }
    
    console.log("Current module found:", currentModule?.title || "None");
    
    // Get recent graded assignments
    const recentGrades = await prisma.assignmentSubmission.findMany({
      where: {
        studentId: student.id,
        grade: { not: null }
      },
      orderBy: { gradedAt: 'desc' },
      take: 5
    });
    
    // Get upcoming assignments (submitted but not graded)
    const upcomingAssignments = await prisma.assignmentSubmission.findMany({
      where: {
        studentId: student.id,
        status: "submitted",
        grade: null
      },
      orderBy: { submittedAt: 'asc' },
      take: 5
    });
    
    // Get published courses (announcements)
    const publishedCourses = await prisma.course.findMany({
      where: {
        status: "published",
        isPublished: true
      },
      include: {
        program: true
      },
      orderBy: { publishedAt: 'desc' },
      take: 5
    });
    
    res.json({
      success: true,
      data: {
        overallProgress,
        completedCourses,
        totalCourses,
        currentModule: currentModule ? {
          id: currentModule.id,
          title: currentModule.title,
          description: currentModule.description || "No description available",
          totalContent: currentModuleContent.length,
          completedContent: currentModuleContent.filter(c => {
            for (const enrollment of student.enrollments) {
              if (enrollment.contentProgress.some(cp => cp.contentId === c.id && cp.isCompleted)) {
                return true;
              }
            }
            return false;
          }).length
        } : null,
        currentModuleContent: currentModuleContent.map(c => ({
          id: c.id,
          title: c.title,
          type: c.type,
          isCompleted: student.enrollments.some(e => 
            e.contentProgress.some(cp => cp.contentId === c.id && cp.isCompleted)
          )
        })),
        nextModule: nextModule ? {
          id: nextModule.id,
          title: nextModule.title,
          description: nextModule.description || "No description available"
        } : null,
        recentGrades: recentGrades.map(g => ({
          id: g.id,
          grade: g.grade,
          feedback: g.feedback,
          gradedAt: g.gradedAt,
          assignmentTitle: `Assignment ${g.assignmentId}`
        })),
        upcomingAssignments: upcomingAssignments.map(a => ({
          id: a.id,
          submittedAt: a.submittedAt,
          assignmentTitle: `Assignment ${a.assignmentId}`
        })),
        publishedCourses: publishedCourses.map(c => ({
          id: c.id,
          name: c.name,
          programName: c.program?.name || "General",
          publishedAt: c.publishedAt
        }))
      }
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard data", error: String(err) });
  }
});

export default router;