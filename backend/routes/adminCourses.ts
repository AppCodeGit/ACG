import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ==============================
// 1️⃣ ADMIN COURSE STATS
// ==============================
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const [totalCourses, activeCourses, totalEnrollments] = await Promise.all([
      prisma.course.count(),
      prisma.course.count({
        where: { status: "published" },
      }),
      prisma.enrollment.count(),
    ]);

    res.json({
      totalCourses,
      activeCourses,
      totalEnrollments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

// ==============================
// 2️⃣ PAGINATED COURSES LIST
// ==============================
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string || "";
    const statusFilter = req.query.status as string || "all";
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    let where: any = {};
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      };
    }
    
    if (statusFilter !== "all") {
      where.status = statusFilter;
    }
    
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          enrollments: {
            select: {
              id: true,
              student: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                  phone: true,
                  profileImage: true,
                }
              }
            }
          },
          program: {
            select: {
              name: true
            }
          }
        }
      }),
      prisma.course.count({ where })
    ]);
    
    const formattedCourses = courses.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      programName: course.program?.name,
      status: course.status,
      enrolledStudentsCount: course.enrollments.length,
      enrolledStudents: course.enrollments.map(e => e.student),
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }));
    
    res.json({
      courses: formattedCourses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// ==============================
// 3️⃣ SINGLE COURSE DETAILS WITH ENROLLED STUDENTS
// ==============================
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        enrollments: {
          include: {
            student: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                profileImage: true,
                gender: true,
                programName: true,
              }
            }
          }
        },
        program: {
          select: {
            name: true
          }
        }
      }
    });
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    const formattedCourse = {
      id: course.id,
      name: course.name,
      description: course.description,
      programName: course.program?.name,
      status: course.status,
      enrolledStudentsCount: course.enrollments.length,
      enrolledStudents: course.enrollments.map(e => ({
        id: e.student.id,
        fullName: e.student.fullName,
        email: e.student.email,
        phone: e.student.phone,
        profileImage: e.student.profileImage,
        gender: e.student.gender,
        programName: e.student.programName,
        enrolledAt: e.enrolledAt,
      })),
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
    
    res.json({ course: formattedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch course details" });
  }
});

export default router;