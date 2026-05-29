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

router.post('/profile/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const AWS = require('aws-sdk');
    const cognito = new AWS.CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION || 'us-east-1'
    });

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: email
    };

    await cognito.forgotPassword(params).promise();

    res.status(200).json({
      success: true,
      message: 'Password reset code sent to your email'
    });

  } catch (error: any) {
    console.error('Error sending reset code:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to send reset code' 
    });
  }
});

// POST: Confirm forgot password with code
router.post('/profile/confirm-forgot-password', async (req: Request, res: Response) => {
  try {
    const { email, confirmationCode, newPassword } = req.body;

    if (!email || !confirmationCode || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, confirmation code, and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    const AWS = require('aws-sdk');
    const cognito = new AWS.CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION || 'us-east-1'
    });

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: email,
      ConfirmationCode: confirmationCode,
      Password: newPassword
    };

    await cognito.confirmForgotPassword(params).promise();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully. Please login with your new password.'
    });

  } catch (error: any) {
    console.error('Error confirming reset:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to reset password' 
    });
  }
});  

export default router;