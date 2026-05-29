// backend/routes/studentforms.ts
import express from 'express';
import { PrismaClient, Gender } from '@prisma/client'; 

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const prisma = new PrismaClient();

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});




router.post('/personalDetails', async (req, res) => {
  try {
    const body = req.body;

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'nationality', 'dob', 'gender', 'profileImage'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Validate gender value
    const validGenders = ['male', 'female', 'other'];
    const normalizedGender = body.gender.toLowerCase();
    if (!validGenders.includes(normalizedGender)) {
      return res.status(400).json({ message: 'Gender must be either male, female, or other' });
    }

    // Check if student with this email already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email: body.email },
    });
    if (existingStudent) {
      return res.status(409).json({ message: 'Student with this email already exists' });
    }

    // Handle profile image upload to S3
    let profileImageUrl = body.profileImage;

    if (body.profileImage && body.profileImage.startsWith('data:image')) {
      try {
        const matches = body.profileImage.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          return res.status(400).json({ message: 'Invalid image format' });
        }

        const imageType = matches[1];
        const imageData = matches[2];
        const buffer = Buffer.from(imageData, 'base64');

        // Validate file size (max 5MB)
        if (buffer.length > 5 * 1024 * 1024) {
          return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
        }

        // Validate image type
        const allowedTypes = ['jpeg', 'jpg', 'png', 'webp', 'gif'];
        if (!allowedTypes.includes(imageType.toLowerCase())) {
          return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.' });
        }

        // Generate unique filename
        const fileName = `profile-images/${uuidv4()}.${imageType}`;

        // Upload to S3
        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: fileName,
          Body: buffer,
          ContentType: `image/${imageType}`,
        });

        await s3Client.send(command);

        // Construct the S3 URL
        profileImageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      } catch (s3Error) {
        console.error('S3 Upload Error:', s3Error);
        return res.status(500).json({ message: 'Failed to upload profile image to cloud storage' });
      }
    }

    // Map string gender to Gender enum
    let genderEnum: Gender;
    if (normalizedGender === 'male') genderEnum = Gender.male;
    else if (normalizedGender === 'female') genderEnum = Gender.female;
    else genderEnum = Gender.other;

    // Create student record
    const student = await prisma.student.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        nationality: body.nationality,
        dob: new Date(body.dob),
        gender: genderEnum, // Use the enum value
        profileImage: profileImageUrl,
      },
    });

    return res.status(201).json({
      message: 'Personal details saved successfully',
      student: student,
    });

  } catch (error) {
    console.error('Error saving personal details:', error);
    return res.status(500).json({ message: 'Failed to save personal details', error: error.message });
  }
});

// ==================== PROGRAM APPLYING FOR ====================
router.post('/programApplyingFor', async (req, res) => {
  try {
    const { programName, courseDetails, email } = req.body;

    // Validate required fields
    if (!programName) {
      return res.status(400).json({ 
        message: 'Program name is required' 
      });
    }

    if (!courseDetails) {
      return res.status(400).json({ 
        message: 'Course details are required' 
      });
    }

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required to identify the student' 
      });
    }

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (!existingStudent) {
      return res.status(404).json({ 
        message: 'Student not found. Please complete personal details first.' 
      });
    }

    // Update student with program information
    const student = await prisma.student.update({
      where: { email },
      data: {
        programName,
        courseDetails,
      },
    });

    return res.status(200).json({
      message: 'Program application saved successfully',
      student: {
        id: student.id,
        programName: student.programName,
        courseDetails: student.courseDetails,
        email: student.email
      }
    });

  } catch (error: any) {
    console.error('Error saving program application:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        message: 'Student not found. Please complete personal details first.' 
      });
    }

    return res.status(500).json({ 
      message: 'Failed to save program application' 
    });
  }
});

// GET endpoint to fetch saved program data
router.get('/programApplyingFor', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required' 
      });
    }

    const student = await prisma.student.findUnique({
      where: { email: email as string },
      select: {
        programName: true,
        courseDetails: true,
      },
    });

    if (!student) {
      return res.status(404).json({ 
        message: 'Student not found' 
      });
    }

    return res.json({
      programName: student.programName || "",
      courseDetails: student.courseDetails || ""
    });

  } catch (error) {
    console.error('Error fetching program data:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch program data' 
    });
  }
});


// ==================== EDUCATIONAL BACKGROUND ====================
router.post('/educationalBackground', async (req, res) => {
  try {
    const { qualification, institution, graduationYear, studyArea, certifications, email } = req.body;

    // Validate required fields
    const requiredFields = ['qualification', 'institution', 'graduationYear', 'studyArea', 'certifications'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required to identify the student' 
      });
    }

    // Validate graduation year
    const currentYear = new Date().getFullYear();
    if (graduationYear < 1900 || graduationYear > currentYear) {
      return res.status(400).json({ 
        message: `Graduation year must be between 1900 and ${currentYear}` 
      });
    }

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (!existingStudent) {
      return res.status(404).json({ 
        message: 'Student not found. Please complete personal details first.' 
      });
    }

    // Update student with educational background
    const student = await prisma.student.update({
      where: { email },
      data: {
        qualification,
        institution,
        graduationYear,
        studyArea,
        certifications,
      },
    });

    return res.status(200).json({
      message: 'Educational background saved successfully',
      student: {
        id: student.id,
        qualification: student.qualification,
        institution: student.institution,
        graduationYear: student.graduationYear,
        studyArea: student.studyArea,
        certifications: student.certifications,
        email: student.email
      }
    });

  } catch (error: any) {
    console.error('Error saving educational background:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        message: 'Student not found. Please complete personal details first.' 
      });
    }

    return res.status(500).json({ 
      message: 'Failed to save educational background' 
    });
  }
});

// GET endpoint to fetch educational background
router.get('/educationalBackground', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required' 
      });
    }

    const student = await prisma.student.findUnique({
      where: { email: email as string },
      select: {
        qualification: true,
        institution: true,
        graduationYear: true,
        studyArea: true,
        certifications: true,
      },
    });

    if (!student) {
      return res.status(404).json({ 
        message: 'Student not found' 
      });
    }

    return res.json({
      qualification: student.qualification || "",
      institution: student.institution || "",
      graduationYear: student.graduationYear || "",
      studyArea: student.studyArea || "",
      certifications: student.certifications || ""
    });

  } catch (error) {
    console.error('Error fetching educational background:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch educational background' 
    });
  }
});

// backend/routes/studentforms.ts - Add these endpoints

// ==================== GUARDIAN DETAILS ====================
router.post('/guardianDetails', async (req, res) => {
  try {
    const { guardianFullName, relationship, guardianPhone, guardianEmail, guardianOccupation, email } = req.body;

    // Validate required fields
    const requiredFields = ['guardianFullName', 'relationship', 'guardianPhone', 'guardianEmail', 'guardianOccupation'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required to identify the student' 
      });
    }

    // Validate guardian email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(guardianEmail)) {
      return res.status(400).json({ message: 'Guardian email address is invalid' });
    }

    // Validate guardian phone (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(guardianPhone.replace(/\D/g, ''))) {
      return res.status(400).json({ message: 'Guardian phone number must be 10 digits' });
    }

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (!existingStudent) {
      return res.status(404).json({ 
        message: 'Student not found. Please complete personal details first.' 
      });
    }

    // Update student with guardian details
    const student = await prisma.student.update({
      where: { email },
      data: {
        guardianFullName,
        relationship,
        guardianPhone,
        guardianEmail,
        guardianOccupation,
      },
    });

    return res.status(200).json({
      message: 'Guardian details saved successfully',
      student: {
        id: student.id,
        guardianFullName: student.guardianFullName,
        relationship: student.relationship,
        guardianPhone: student.guardianPhone,
        guardianEmail: student.guardianEmail,
        guardianOccupation: student.guardianOccupation,
        email: student.email
      }
    });

  } catch (error: any) {
    console.error('Error saving guardian details:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        message: 'Student not found. Please complete personal details first.' 
      });
    }

    return res.status(500).json({ 
      message: 'Failed to save guardian details' 
    });
  }
});

// GET endpoint to fetch guardian details
router.get('/guardianDetails', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ 
        message: 'Email is required' 
      });
    }

    const student = await prisma.student.findUnique({
      where: { email: email as string },
      select: {
        guardianFullName: true,
        relationship: true,
        guardianPhone: true,
        guardianEmail: true,
        guardianOccupation: true,
      },
    });

    if (!student) {
      return res.status(404).json({ 
        message: 'Student not found' 
      });
    }

    return res.json({
      guardianFullName: student.guardianFullName || "",
      relationship: student.relationship || "",
      guardianPhone: student.guardianPhone || "",
      guardianEmail: student.guardianEmail || "",
      guardianOccupation: student.guardianOccupation || ""
    });

  } catch (error: any) {
    console.error('Error fetching guardian details:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch guardian details' 
    });
  }
});

// ==================== COMPLETE FORM SUBMISSION STATUS ====================
router.get('/formStatus/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const student = await prisma.student.findUnique({
      where: { email },
      select: {
        fullName: true,
        programName: true,
        qualification: true,
        guardianFullName: true,
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const formStatus = {
      personalDetails: !!student.fullName,
      programApplyingFor: !!student.programName,
      educationalBackground: !!student.qualification,
      guardianDetails: !!student.guardianFullName,
      allCompleted: !!(student.fullName && student.programName && student.qualification && student.guardianFullName)
    };

    return res.json(formStatus);

  } catch (error) {
    console.error('Error fetching form status:', error);
    return res.status(500).json({ message: 'Failed to fetch form status' });
  }
});

// ==================== FINAL SUBMISSION (ALL FORMS AT ONCE) ====================
// ==================== FINAL SUBMISSION (ALL FORMS AT ONCE) ====================
router.post('/submitApplication', async (req, res) => {
  try {
    const { personalDetails, programDetails, educationDetails, guardianDetails } = req.body;

    // Validate email exists
    if (!personalDetails?.email) {
      return res.status(400).json({ 
        message: 'Email is required' 
      });
    }

    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email: personalDetails.email }
    });

    if (existingStudent) {
      return res.status(409).json({ 
        message: 'Student with this email already exists' 
      });
    }

    // Validate gender
    const validGenders = ['male', 'female', 'other'];
    const normalizedGender = personalDetails.gender?.toLowerCase();
    if (!validGenders.includes(normalizedGender)) {
      return res.status(400).json({ message: 'Gender must be either male, female, or other' });
    }

    // Create complete student record with all data
    const student = await prisma.student.create({
      data: {
        // Personal Details
        fullName: personalDetails.fullName,
        email: personalDetails.email,
        phone: personalDetails.phone,
        address: personalDetails.address,
        nationality: personalDetails.nationality,
        dob: new Date(personalDetails.dob),
        gender: normalizedGender, // Use the normalized gender string
        profileImage: personalDetails.profileImage,
        
        // Program Details
        programName: programDetails?.programName,
        courseDetails: programDetails?.courseDetails,
        
        // Education Details
        qualification: educationDetails?.qualification,
        institution: educationDetails?.institution,
        graduationYear: educationDetails?.graduationYear ? parseInt(educationDetails.graduationYear) : null,
        studyArea: educationDetails?.studyArea,
        certifications: educationDetails?.certifications,
        
        // Guardian Details
        guardianFullName: guardianDetails?.guardianFullName,
        relationship: guardianDetails?.relationship,
        guardianPhone: guardianDetails?.guardianPhone,
        guardianEmail: guardianDetails?.guardianEmail,
        guardianOccupation: guardianDetails?.guardianOccupation,
        
        // REMOVE this line since userId is optional in your schema
        // userId: 1, // From your auth system - COMMENT THIS OUT
      },
    });

    return res.status(201).json({
      message: 'Application submitted successfully',
      studentId: student.id,
      email: student.email
    });

  } catch (error: any) {
    console.error('Final submission error:', error);
    return res.status(500).json({ 
      message: 'Failed to submit application',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});


export default router;