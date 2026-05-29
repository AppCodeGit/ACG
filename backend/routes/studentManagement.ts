// backend/routes/studentManagement.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Helper function to get string from query parameter
const getStringQuery = (param: string | string[] | undefined | any): string => {
  if (!param) return '';
  if (Array.isArray(param)) {
    return param[0] || '';
  }
  if (typeof param === 'object') {
    return param.toString() || '';
  }
  return param.toString();
};

const getNumberQuery = (param: string | string[] | undefined | any, defaultValue: number): number => {
  const value = getStringQuery(param);
  const parsed = parseInt(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

const getParamId = (id: string | string[] | undefined): number => {
  const idStr = Array.isArray(id) ? id[0] : id;
  return parseInt(idStr || '');
};

// GET /students - Get all students with pagination and search
router.get('/students', async (req: Request, res: Response) => {
  try {
    const page = getNumberQuery(req.query.page, 1);
    const limit = getNumberQuery(req.query.limit, 10);
    const skip = (page - 1) * limit;
    const search = getStringQuery(req.query.search);
    const statusFilter = getStringQuery(req.query.status);

    // Build where clause for students
    let studentWhereClause: any = {};

    if (search) {
      studentWhereClause = {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ]
      };
    }

    // Get students with their user data
    const students = await prisma.student.findMany({
      where: studentWhereClause,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
          }
        },
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    });

    // Apply status filter in memory (since it's based on user relation)
    let filteredStudents = students;
    if (statusFilter === 'active') {
      filteredStudents = students.filter(s => s.user?.isActive === true);
    } else if (statusFilter === 'inactive') {
      filteredStudents = students.filter(s => s.user?.isActive === false);
    }

    const formattedStudents = filteredStudents.map(student => ({
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      profileImage: student.profileImage,
      gender: student.gender,
      status: student.user?.isActive ? 'active' : 'inactive',
      enrollments: student.enrollments,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      students: formattedStudents,
      pagination: {
        page,
        limit,
        total: filteredStudents.length,
        totalPages: Math.ceil(filteredStudents.length / limit),
      }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
// GET /students/stats - Get student statistics
router.get('/students/stats', async (req: Request, res: Response) => {
  try {
    const totalStudents = await prisma.student.count();
    const activeStudents = await prisma.student.count({
      where: {
        user: {
          isActive: true
        }
      }
    });
    const inactiveStudents = totalStudents - activeStudents;
    const totalEnrollments = await prisma.enrollment.count();

    return res.status(200).json({
      success: true,
      totalStudents,
      activeStudents,
      inactiveStudents,
      totalEnrollments
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /students/:id - Get single student details
router.get('/students/:id', async (req: Request, res: Response) => {
  try {
    const studentId = getParamId(req.params.id);

    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
            role: true,
          }
        },
        enrollments: {
          include: {
            course: {
              include: {
                program: true,
                instructor: {
                  select: {
                    name: true,
                    email: true,
                  }
                }
              }
            },
            contentProgress: {
              include: {
                content: true
              }
            }
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json({
      success: true,
      student: {
        ...student,
        status: student.user?.isActive ? 'active' : 'inactive',
      }
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /students - Create new student
router.post('/students', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      nationality,
      dob,
      gender,
      profileImage,
      programName,
      courseDetails,
      qualification,
      institution,
      graduationYear,
      studyArea,
      certifications,
      guardianFullName,
      relationship,
      guardianPhone,
      guardianEmail,
      guardianOccupation,
    } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: 'Full name, email, and phone are required' });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this email already exists' });
    }

    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      const generateStudentId = () => {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `STU${year}${randomNum}`;
      };

      user = await prisma.user.create({
        data: {
          cognitoId: `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: fullName,
          email: email.toLowerCase(),
          role: 'student',
          isActive: true,
          studentId: generateStudentId(),
        }
      });
    }

    const student = await prisma.student.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        phone,
        address: address || '',
        nationality: nationality || '',
        dob: dob ? new Date(dob) : new Date(),
        gender,
        profileImage: profileImage || '',
        programName: programName || '',
        courseDetails: courseDetails || '',
        qualification: qualification || '',
        institution: institution || '',
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        studyArea: studyArea || '',
        certifications: certifications || '',
        guardianFullName: guardianFullName || '',
        relationship: relationship || '',
        guardianPhone: guardianPhone || '',
        guardianEmail: guardianEmail || '',
        guardianOccupation: guardianOccupation || '',
        userId: user.id,
      },
      include: {
        user: {
          select: {
            isActive: true
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student: {
        ...student,
        status: student.user?.isActive ? 'active' : 'inactive',
      }
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /students/:id - Update student
router.put('/students/:id', async (req: Request, res: Response) => {
  try {
    const studentId = getParamId(req.params.id);
    
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const updateData = req.body;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const existingStudent = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (updateData.dob) {
      updateData.dob = new Date(updateData.dob);
    }

    if (updateData.graduationYear) {
      updateData.graduationYear = parseInt(updateData.graduationYear);
    }

    if (updateData.fullName) {
      await prisma.user.update({
        where: { email: existingStudent.email },
        data: { name: updateData.fullName }
      });
    }

    const student = await prisma.student.update({
      where: { id: studentId },
      data: updateData,
      include: {
        user: {
          select: {
            isActive: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      student: {
        ...student,
        status: student.user?.isActive ? 'active' : 'inactive',
      }
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /students/:id/status - Toggle student status
router.patch('/students/:id/status', async (req: Request, res: Response) => {
  try {
    const studentId = getParamId(req.params.id);
    const { status } = req.body;

    console.log(`Toggle status request received for student ${studentId} to ${status}`);

    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    if (!status || !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Valid status (active/inactive) is required' });
    }

    // ✅ FIRST find the student by their ID
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: true  // Include the associated user
      }
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // ✅ THEN check if the student has a user linked
    if (!student.user) {
      console.log(`Student ${studentId} has no linked user. Creating one...`);
      
      // Check if user exists by email
      let user = await prisma.user.findUnique({
        where: { email: student.email }
      });

      if (!user) {
        // Create a new user for this student
        const generateStudentId = () => {
          const year = new Date().getFullYear();
          const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
          return `STU${year}${randomNum}`;
        };

        user = await prisma.user.create({
          data: {
            cognitoId: `student_${studentId}_${Date.now()}`,
            name: student.fullName,
            email: student.email,
            role: 'student',
            isActive: status === 'active',
            studentId: generateStudentId(),
          }
        });
      }

      // Link the user to the student
      await prisma.student.update({
        where: { id: studentId },
        data: { userId: user.id }
      });

      return res.status(200).json({
        success: true,
        message: `Student status updated to ${status}`,
        student: {
          id: student.id,
          fullName: student.fullName,
          email: student.email,
          status: status,
        }
      });
    }

    // ✅ Update the user's status (this is where the error was happening)
    const updatedUser = await prisma.user.update({
      where: { id: student.user.id },  // Using the user's ID from the student relation
      data: { isActive: status === 'active' }
    });

    console.log(`Student ${studentId} status updated to ${updatedUser.isActive ? 'active' : 'inactive'}`);

    return res.status(200).json({
      success: true,
      message: `Student status updated to ${status}`,
      student: {
        id: student.id,
        fullName: student.fullName,
        email: student.email,
        status: updatedUser.isActive ? 'active' : 'inactive',
      }
    });
  } catch (error) {
    console.error('Error updating student status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /students/:id - Delete student
router.delete('/students/:id', async (req: Request, res: Response) => {
  try {
    const studentId = getParamId(req.params.id);

    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        enrollments: true,
        assignmentSubmissions: true,
      }
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    for (const enrollment of student.enrollments) {
      await prisma.contentProgress.deleteMany({
        where: { enrollmentId: enrollment.id }
      });
    }

    await prisma.enrollment.deleteMany({
      where: { studentId: studentId }
    });

    await prisma.assignmentSubmission.deleteMany({
      where: { studentId: studentId }
    });

    if (student.userId) {
      await prisma.payment.deleteMany({
        where: { userId: student.userId }
      });
    }

    await prisma.student.delete({
      where: { id: studentId }
    });

    if (student.userId) {
      await prisma.user.update({
        where: { id: student.userId },
        data: { isActive: false }
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /students/search - Search students
router.get('/students/search', async (req: Request, res: Response) => {
  try {
    const query = getStringQuery(req.query.q);
    const page = getNumberQuery(req.query.page, 1);
    const limit = getNumberQuery(req.query.limit, 10);
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const students = await prisma.student.findMany({
      where: {
        OR: [
          { fullName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
        ]
      },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            isActive: true
          }
        },
        enrollments: {
          take: 5
        }
      }
    });

    const total = await prisma.student.count({
      where: {
        OR: [
          { fullName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
        ]
      }
    });

    const formattedStudents = students.map(student => ({
      id: student.id,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      profileImage: student.profileImage,
      status: student.user?.isActive ? 'active' : 'inactive',
      enrollmentsCount: student.enrollments.length
    }));

    return res.status(200).json({
      success: true,
      students: formattedStudents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching students:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Backfill existing students
router.post('/students/backfill', async (req: Request, res: Response) => {
  try {
    const studentsWithoutUser = await prisma.student.findMany({
      where: { userId: null }
    });

    let updatedCount = 0;

    for (const student of studentsWithoutUser) {
      let user = await prisma.user.findUnique({
        where: { email: student.email }
      });

      if (!user) {
        const generateStudentId = () => {
          const year = new Date().getFullYear();
          const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
          return `STU${year}${randomNum}`;
        };

        user = await prisma.user.create({
          data: {
            cognitoId: `backfill_${student.id}_${Date.now()}`,
            name: student.fullName,
            email: student.email,
            role: 'student',
            isActive: true,
            studentId: generateStudentId(),
          }
        });
      }

      await prisma.student.update({
        where: { id: student.id },
        data: { userId: user.id }
      });
      updatedCount++;
    }

    return res.status(200).json({
      success: true,
      message: `Backfilled ${updatedCount} students`,
      updatedCount
    });
  } catch (error) {
    console.error('Error backfilling students:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Log all registered routes for debugging
console.log('\n✅ Student Management Routes:');
router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    console.log(`   PATCH ${r.route.path}`);
  }
});

export default router;