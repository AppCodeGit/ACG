// routes/studentPortalRoutes.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Helper to ensure email is a string
const getEmailString = (email: string | string[] | undefined): string | null => {
  if (!email) return null;
  return Array.isArray(email) ? email[0] : email;
};

import AWS from 'aws-sdk';

// Configure AWS Cognito
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || 'us-east-1'
});

// ==================== STUDENT DATA ENDPOINTS ====================

// GET: Fetch complete student data by email
router.get('/students/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        payments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    // Combine user and student profile data
    const studentData = {
      id: user.id,
      cognitoId: user.cognitoId,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      personalDetails: user.studentProfile || {},
      payments: user.payments
    };

    res.status(200).json({
      success: true,
      student: studentData
    });

  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch student data' 
    });
  }
});

// ==================== PROFILE ENDPOINTS ====================

// GET: Fetch full profile data by email
router.get('/profile/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { studentProfile: true }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role,
        studentProfile: user.studentProfile
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profile data' 
    });
  }
});

// PUT: Update user name
router.put('/profile/name/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);
    const { name } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    if (!name || name.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Name is required' 
      });
    }

    const user = await prisma.user.update({
      where: { email },
      data: { name: name.trim() }
    });

    // Also update student profile if exists
    await prisma.student.updateMany({
      where: { email: email },
      data: { fullName: name.trim() }
    });

    res.status(200).json({
      success: true,
      message: 'Name updated successfully',
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update name' 
    });
  }
});

// PUT: Update user email
router.put('/profile/email/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const oldEmail = getEmailString(emailParam);
    const { newEmail } = req.body;

    if (!oldEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid email is required' 
      });
    }

    // Check if new email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail }
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already in use' 
      });
    }

    // Update user email
    const user = await prisma.user.update({
      where: { email: oldEmail },
      data: { email: newEmail }
    });

    // Update student profile email
    await prisma.student.updateMany({
      where: { email: oldEmail },
      data: { email: newEmail }
    });

    res.status(200).json({
      success: true,
      message: 'Email updated successfully',
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update email' 
    });
  }
});

// PUT: Update user password (with Cognito integration)
router.put('/profile/password/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);
    const { currentPassword, newPassword, accessToken } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password and new password are required' 
      });
    }

    if (!accessToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token is required. Please log in again.' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'New password must be different from current password' 
      });
    }

    // Find the user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update password in Cognito using the access token
    const params = {
      AccessToken: accessToken,
      PreviousPassword: currentPassword,
      ProposedPassword: newPassword
    };

    try {
      await cognito.changePassword(params).promise();
      
      // Clear refresh token in database to force re-login
      await prisma.user.update({
        where: { email },
        data: { refreshToken: null }
      });

      res.status(200).json({
        success: true,
        message: 'Password updated successfully. Please login again with your new password.'
      });
      
    } catch (cognitoError: any) {
      console.error('Cognito password change error:', cognitoError);
      
      // Handle specific Cognito errors
      if (cognitoError.code === 'NotAuthorizedException') {
        return res.status(401).json({ 
          success: false, 
          message: 'Current password is incorrect' 
        });
      }
      
      if (cognitoError.code === 'InvalidPasswordException') {
        return res.status(400).json({ 
          success: false, 
          message: 'Password does not meet requirements. Password must have at least 6 characters, uppercase, lowercase, numbers, and special characters.' 
        });
      }
      
      if (cognitoError.code === 'ExpiredAccessTokenException') {
        return res.status(401).json({ 
          success: false, 
          message: 'Session expired. Please login again.' 
        });
      }
      
      if (cognitoError.code === 'LimitExceededException') {
        return res.status(429).json({ 
          success: false, 
          message: 'Too many password attempts. Please try again later.' 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: cognitoError.message || 'Failed to update password in Cognito' 
      });
    }

  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update password. Please try again.' 
    });
  }
});

// ==================== PROFILE IMAGE ENDPOINTS ====================

// GET: Fetch profile image
router.get('/profile/profile-image/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const student = await prisma.student.findUnique({
      where: { email },
      select: { profileImage: true }
    });

    res.status(200).json({
      success: true,
      profileImage: student?.profileImage || null
    });

  } catch (error) {
    console.error('Error fetching profile image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profile image' 
    });
  }
});

// PUT: Update profile image (supports base64)
router.put('/profile/profile-image/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);
    const { profileImage } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    if (!profileImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Profile image is required' 
      });
    }

    // Validate base64 format (optional)
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    if (profileImage !== '' && !base64Regex.test(profileImage)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid image format. Must be base64 encoded image' 
      });
    }

    // Check if student profile exists
    let student = await prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      // Create student profile if it doesn't exist
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      student = await prisma.student.create({
        data: {
          userId: user.id,
          fullName: user.name,
          email: user.email,
          phone: '',
          address: '',
          nationality: '',
          dob: new Date(),
          gender: 'other',
          profileImage: profileImage
        }
      });
    } else {
      // Update existing profile
      student = await prisma.student.update({
        where: { email },
        data: { profileImage }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      profileImage: student.profileImage
    });

  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update profile image' 
    });
  }
});

// GET: Fetch student profile by email
router.get('/student/profile/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const student = await prisma.student.findUnique({
      where: { email },
    });

    res.status(200).json({
      success: true,
      student: student
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch student profile' 
    });
  }
});

// ==================== PHONE NUMBER ENDPOINTS ====================

// GET: Fetch phone number
router.get('/profile/phone/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const student = await prisma.student.findUnique({
      where: { email },
      select: { phone: true }
    });

    res.status(200).json({
      success: true,
      phone: student?.phone || null
    });

  } catch (error) {
    console.error('Error fetching phone:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch phone number' 
    });
  }
});

// PUT: Update phone number
router.put('/profile/phone/:email', async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);
    const { phone } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    if (!phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required' 
      });
    }

    // Validate phone number
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s()-]/g, ''))) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid phone number (10-15 digits)' 
      });
    }

    // Check if student profile exists
    let student = await prisma.student.findUnique({
      where: { email }
    });

    if (!student) {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      student = await prisma.student.create({
        data: {
          userId: user.id,
          fullName: user.name,
          email: user.email,
          phone: phone,
          address: '',
          nationality: '',
          dob: new Date(),
          gender: 'other',
          profileImage: ''
        }
      });
    } else {
      student = await prisma.student.update({
        where: { email },
        data: { phone }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Phone number updated successfully',
      phone: student.phone
    });

  } catch (error) {
    console.error('Error updating phone:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update phone number' 
    });
  }
});

export default router;