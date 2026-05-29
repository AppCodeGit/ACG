import express from "express";
import { PrismaClient } from "@prisma/client";
import { upload, uploadToS3, deleteFromS3 } from "../config/s3";
import nodemailer from "nodemailer";
const router = express.Router();
const prisma = new PrismaClient();



// ============================================
// GET STUDENT BY EMAIL
// ============================================
router.get("/students/by-email", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const student = await prisma.student.findUnique({
      where: { email: email as string },
      select: {
        id: true,
        fullName: true,
        email: true,
        programName: true,
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// ============================================
// GET ASSIGNMENT DETAILS
// ============================================
router.get("/content/:contentId/details", async (req, res) => {
  try {
    const contentId = parseInt(req.params.contentId);
    const { email } = req.query;

    const content = await prisma.courseContent.findUnique({
      where: { id: contentId },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    if (content.type !== "assignment") {
      return res.status(400).json({ error: "This content is not an assignment" });
    }

    let studentId = null;
    if (email) {
      const student = await prisma.student.findUnique({
        where: { email: email as string },
        select: { id: true },
      });
      if (student) studentId = student.id;
    }

    let existingSubmission = null;
    if (studentId) {
      const submission = await prisma.assignmentSubmission.findFirst({
        where: {
          assignmentId: contentId,
          studentId: studentId,
        },
        orderBy: { attemptNumber: "desc" },
      });

      if (submission) {
        existingSubmission = {
          id: submission.id,
          submissionUrl: submission.submissionUrl,
          submissionText: submission.submissionText,
          grade: submission.grade,
          feedback: submission.feedback,
          status: submission.status,
          attemptNumber: submission.attemptNumber,
          submittedAt: submission.submittedAt,
        };
      }
    }

    res.json({
      success: true,
      contentId: content.id,
      title: content.title,
      assignmentId: content.id,
      description: content.description,
      instructions: content.description,
      dueDate: null,
      maxPoints: null,
      passingScore: null,
      allowedAttempts: 1,
      submission: existingSubmission,
    });
  } catch (error) {
    console.error("Error fetching assignment details:", error);
    res.status(500).json({ error: "Failed to fetch assignment details" });
  }
});


// Configure email transporter with Gmail-specific settings
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // Gmail-specific settings
  service: 'gmail',
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// Verify transporter configuration (add this before using it)
async function verifyEmailTransporter() {
  try {
    await emailTransporter.verify();
    console.log('✅ Email transporter is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error);
    return false;
  }
}

// Helper function to send email notifications to admins
async function sendEmailToAdmins(admins: any[], studentName: string, assignmentTitle: string, programName: string, submissionId: number) {
  // Verify transporter first (optional, for debugging)
  const isVerified = await verifyEmailTransporter();
  if (!isVerified) {
    console.log('⚠️ Email transporter not ready, skipping emails');
    return [];
  }

  const emailPromises = admins.map(async (admin) => {
    // Make sure admin has email
    if (!admin.email) {
      console.log(`⚠️ Admin ${admin.id} has no email address`);
      return null;
    }

    console.log(`📧 Attempting to send email to: ${admin.email}`);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: admin.email,
      subject: `📝 New Assignment Submission: ${assignmentTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Assignment Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #e2e8f0; line-height: 1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e2e8f0;">
            <tr>
              <td align="center">
                <!-- Main Container -->
                <table width="100%"  cellpadding="0" cellspacing="0" width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header with Brand Color -->
                  <tr>
                    <td style="background-color: #e9691e; padding: 10px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">New Assignment Submission</h1>
                      <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Action Required: Review Student Work</p>
                    </td>
                  </tr>
                  
                  <!-- Content Area -->
                  <tr>
                    <td style="padding: 10px; text-align: center;">
                      <!-- Greeting -->
                      <h2 style="color: #1a2a3a; font-size: 22px; margin: 0 0 10px 0;">Hello ${admin.name || 'Admin'},</h2>
                      <p style="color: #4a5568; margin: 0 0 25px 0; font-size: 16px;">
                        A student has submitted an assignment. Please review the details below and provide feedback.
                      </p>
                      
                      <!-- Submission Details Table -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7fafc; border-radius: 8px; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <!-- Student Name -->
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 40%;">
                                        <strong style="color: #4a5568;">Student Name:</strong>
                                      </td>
                                      <td style="width: 60%;">
                                        <span style="color: #2d3748;">${studentName}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- Assignment Title -->
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 40%;">
                                        <strong style="color: #4a5568;">Assignment:</strong>
                                      </td>
                                      <td style="width: 60%;">
                                        <span style="color: #2d3748; font-weight: 600;">${assignmentTitle}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- Program Name -->
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 40%;">
                                        <strong style="color: #4a5568;">Program:</strong>
                                      </td>
                                      <td style="width: 60%;">
                                        <span style="color: #2d3748;">${programName}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- Submission ID -->
                              <tr>
                                <td style="padding: 12px 0;">
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 40%;">
                                        <strong style="color: #4a5568;">Submission ID:</strong>
                                      </td>
                                      <td style="width: 60%;">
                                        <span style="color: #2d3748; font-family: monospace;">#${submissionId}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Action Button -->
                      <div style="text-align: center; margin: 35px 0;">
                        <a href="${process.env.APP_URL || 'http://localhost:3000'}/admin/submissions/${submissionId}" 
                           style="background-color: #e9691e; color: #ffffff; padding: 14px 32px; text-decoration: none; 
                                  border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;
                                  box-shadow: 0 2px 4px rgba(233, 105, 30, 0.2); transition: all 0.3s ease;">
                          📋 View Submission
                        </a>
                      </div>
                      
                      <!-- Additional Info -->
                      <div style="background-color: #fff3e8; border-left: 4px solid #e9691e; padding: 15px 20px; margin: 30px 0 20px 0; border-radius: 4px;">
                        <p style="margin: 0; color: #5a4a3a; font-size: 14px;">
                          <strong>💡 Quick Tip:</strong> You can grade this submission, provide feedback, and update the student's progress directly from the admin panel.
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f7fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="color: #718096; font-size: 12px; margin: 0 0 10px 0;">
                        This is an automated notification from your <span style="color: #e9691e; font-weight: 600;">LMS System</span>.
                      </p>
                      <p style="color: #a0aec0; font-size: 11px; margin: 0;">
                        © ${new Date().getFullYear()} Learning Management System. All rights reserved.
                      </p>
                      <p style="color: #a0aec0; font-size: 11px; margin: 10px 0 0 0;">
                        <span style="color: #e9691e;">✦</span> You received this email because you are an administrator in the LMS system.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    try {
      const info = await emailTransporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${admin.email} - Message ID: ${info.messageId}`);
      return { success: true, email: admin.email };
    } catch (emailError: any) {
      console.error(`❌ Failed to send email to ${admin.email}:`, emailError.message);
      if (emailError.code) {
        console.error(`Error code: ${emailError.code}`);
      }
      return { success: false, email: admin.email, error: emailError.message };
    }
  });

  const results = await Promise.all(emailPromises);
  return results.filter(r => r !== null);
}

// ============================================
// SUBMIT ASSIGNMENT (UPDATED WITH EMAIL NOTIFICATIONS)
// ============================================
router.post("/submit", upload.single("file"), async (req, res) => {
  try {
    console.log("=== SUBMIT ROUTE STARTED ===");

    const { contentId, email, submissionText } = req.body;
    const file = req.file;

    if (!contentId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const student = await prisma.student.findUnique({
      where: { email: email },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const content = await prisma.courseContent.findUnique({
      where: { id: parseInt(contentId) },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    if (content.type !== "assignment") {
      return res.status(400).json({ error: "This content is not an assignment" });
    }

    const existingSubmission = await prisma.assignmentSubmission.findFirst({
      where: {
        assignmentId: content.id,
        studentId: student.id,
      },
      orderBy: { attemptNumber: "desc" },
    });

    if (existingSubmission && existingSubmission.submissionUrl) {
      try {
        await deleteFromS3(existingSubmission.submissionUrl);
      } catch (deleteError) {
        console.error("Error deleting old file:", deleteError);
      }
    }

    let submissionUrl = null;
    if (file) {
      try {
        const uploadResult = await uploadToS3(file, "submitted-assignments");
        submissionUrl = uploadResult.url;
      } catch (s3Error) {
        console.error("S3 Upload Error:", s3Error);
        return res.status(500).json({ error: "File upload failed" });
      }
    }

    let submission;
    let isResubmit = false;

    if (existingSubmission) {
      isResubmit = true;
      submission = await prisma.assignmentSubmission.update({
        where: { id: existingSubmission.id },
        data: {
          submissionUrl: submissionUrl,
          submissionText: submissionText || null,
          submittedAt: new Date(),
          status: "submitted",
          attemptNumber: existingSubmission.attemptNumber + 1,
          grade: null,
          feedback: null,
          gradedBy: null,
          gradedAt: null,
        },
      });
    } else {
      submission = await prisma.assignmentSubmission.create({
        data: {
          assignmentId: content.id,
          studentId: student.id,
          submissionUrl: submissionUrl,
          submissionText: submissionText || null,
          attemptNumber: 1,
          status: "submitted",
        },
      });
    }

    // Get admins with their email addresses
    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      select: { id: true, email: true, name: true }, // Make sure email and name fields exist
    });

    // Create database notifications
    if (admins.length > 0) {
      try {
        await prisma.assignmentNotification.createMany({
          data: admins.map((admin) => ({
            adminId: admin.id,
            submissionId: submission.id,
            studentName: student.fullName,
            assignmentTitle: content.title,
            programName: content.programName,
            read: false,
          })),
        });
        console.log(`✅ Database notifications created for ${admins.length} admins`);
        
        // Send email notifications
        const emailResults = await sendEmailToAdmins(
          admins,
          student.fullName,
          content.title,
          content.programName,
          submission.id
        );
        
        const successfulEmails = emailResults.filter(r => r?.success).length;
        console.log(`✅ Email notifications sent to ${successfulEmails} admins`);
        
      } catch (notifError) {
        console.error("Error creating notifications:", notifError);
      }
    }

    // Mark content as completed
    try {
      let enrollment = null;
      if (content.courseId) {
        enrollment = await prisma.enrollment.findFirst({
          where: { studentId: student.id, courseId: content.courseId },
        });
      }
      if (!enrollment) {
        enrollment = await prisma.enrollment.findFirst({
          where: { studentId: student.id },
        });
      }

      if (enrollment) {
        await prisma.contentProgress.upsert({
          where: {
            enrollmentId_contentId: {
              enrollmentId: enrollment.id,
              contentId: content.id,
            },
          },
          update: { isCompleted: true, completedAt: new Date() },
          create: {
            enrollmentId: enrollment.id,
            contentId: content.id,
            isCompleted: true,
            completedAt: new Date(),
          },
        });
      }
    } catch (progressError) {
      console.error("Progress update error:", progressError);
    }

    res.json({
      success: true,
      message: isResubmit
        ? "Assignment resubmitted successfully!"
        : "Assignment submitted successfully!",
      submission: {
        id: submission.id,
        attemptNumber: submission.attemptNumber,
        status: submission.status,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (error: any) {
    console.error("Submission error:", error);
    res.status(500).json({ error: error.message || "Failed to submit assignment" });
  }
});



// ============================================
// GET STUDENT SUBMISSIONS
// ============================================
router.get("/student/:email/submissions", async (req, res) => {
  try {
    const { email } = req.params;

    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const submissions = await prisma.assignmentSubmission.findMany({
      where: { studentId: student.id },
      orderBy: { submittedAt: "desc" },
    });

    const submissionsWithContent = await Promise.all(
      submissions.map(async (submission) => {
        const content = await prisma.courseContent.findUnique({
          where: { id: submission.assignmentId },
          select: { id: true, title: true, description: true, type: true },
        });
        return { ...submission, content };
      })
    );

    res.json({ success: true, submissions: submissionsWithContent });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// ============================================
// ADMIN: GRADE SUBMISSION
// ============================================
router.put("/grade/:submissionId", async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback, gradedBy } = req.body;

    const submission = await prisma.assignmentSubmission.update({
      where: { id: parseInt(submissionId) },
      data: {
        grade: grade ? parseFloat(grade) : null,
        feedback: feedback || null,
        gradedBy: gradedBy ? parseInt(gradedBy) : null,
        gradedAt: new Date(),
        status: "graded",
      },
    });

    res.json({ success: true, message: "Assignment graded successfully", submission });
  } catch (error) {
    console.error("Error grading:", error);
    res.status(500).json({ error: "Failed to grade submission" });
  }
});

// ============================================
// ADMIN: GET ALL SUBMISSIONS WITH PAGINATION
// ============================================
router.get("/admin/submissions", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const programName = req.query.program as string;
    const status = req.query.status as string;

    let whereConditions: any = {};

    if (programName && programName !== "all") {
      const programContents = await prisma.courseContent.findMany({
        where: { programName: programName },
        select: { id: true },
      });
      const contentIds = programContents.map(c => c.id);
      whereConditions.assignmentId = { in: contentIds };
    }

    if (status && status !== "all") {
      whereConditions.status = status;
    }

    const total = await prisma.assignmentSubmission.count({ where: whereConditions });

    const submissions = await prisma.assignmentSubmission.findMany({
      where: whereConditions,
      include: {
        student: { select: { id: true, fullName: true, email: true, programName: true } },
      },
      orderBy: { submittedAt: "desc" },
      skip,
      take: limit,
    });

    const submissionsWithContent = await Promise.all(
      submissions.map(async (submission) => {
        const content = await prisma.courseContent.findUnique({
          where: { id: submission.assignmentId },
          select: { id: true, title: true, description: true, type: true, programName: true },
        });
        return { ...submission, content };
      })
    );

    res.json({
      success: true,
      submissions: submissionsWithContent,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// ============================================
// ADMIN: GET NOTIFICATIONS
// ============================================
router.get("/notifications", async (req, res) => {
  try {
    const adminId = parseInt(req.query.adminId as string);
    const limit = parseInt(req.query.limit as string) || 20;
    const unreadOnly = req.query.unreadOnly === "true";

    const where: any = { adminId };
    if (unreadOnly) where.read = false;

    const notifications = await prisma.assignmentNotification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const unreadCount = await prisma.assignmentNotification.count({
      where: { adminId, read: false },
    });

    res.json({ success: true, notifications, unreadCount });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
 
// ============================================
// ADMIN: MARK NOTIFICATION AS READ
// ============================================
router.put("/notifications/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.assignmentNotification.update({
      where: { id: parseInt(id) },
      data: { read: true },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark as read" });
  }
});

// ============================================
// ADMIN: MARK ALL NOTIFICATIONS AS READ
// ============================================
router.put("/notifications/mark-all-read", async (req, res) => {
  try {
    const { adminId } = req.body;
    await prisma.assignmentNotification.updateMany({
      where: { adminId, read: false },
      data: { read: true },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error marking all as read:", error);
    res.status(500).json({ error: "Failed to mark all as read" });
  }
});

// GET single submission by ID
router.get("/submission/:submissionId", async (req, res) => {
  try {
    const submissionId = parseInt(req.params.submissionId);
    
    const submission = await prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            programName: true,
          },
        },
      },
    });
    
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    
    // Get content info
    const content = await prisma.courseContent.findUnique({
      where: { id: submission.assignmentId },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        programName: true,
      },
    });
    
    res.json({ 
      success: true, 
      submission: { ...submission, content } 
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ error: "Failed to fetch submission" });
  }
});

export default router;   