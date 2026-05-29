// backend/routes/adminRoutes.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AWS from 'aws-sdk';
import { adminRegisterLimiter } from '../../middleware/rateLimit';

const router = Router();
const prisma = new PrismaClient();

// Configure AWS Cognito
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1'
});

const cognito = new AWS.CognitoIdentityServiceProvider();

const COGNITO_CONFIG = {
  clientId: process.env.COGNITO_CLIENT_ID!,
  userPoolId: process.env.COGNITO_USER_POOL_ID!
};

// Admin Registration with Secret Key
router.post('/admin-register', adminRegisterLimiter, async (req: Request, res: Response) => {
  try {
    const { name, email, password, secretKey } = req.body;

    // Validate required fields
    if (!name || !email || !password || !secretKey) {
      return res.status(400).json({ 
        error: 'All fields (name, email, password, secretKey) are required' 
      });
    }

    // Check secret key
    const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
    if (!ADMIN_SECRET_KEY) {
      console.error('ADMIN_SECRET_KEY not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    if (secretKey !== ADMIN_SECRET_KEY) {
      return res.status(401).json({ error: 'Invalid secret key' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)' 
      });
    }

    // Check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create user in Cognito
    let cognitoSub: string;
    try {
      const signUpParams = {
        ClientId: COGNITO_CONFIG.clientId,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'name', Value: name }
        ]
      };

      const cognitoResponse = await cognito.signUp(signUpParams).promise();
      cognitoSub = cognitoResponse.UserSub!;
      
      console.log(`✅ Admin user created in Cognito: ${email}`);

      // FORCE resend verification email immediately
      try {
        const resendParams = {
          ClientId: COGNITO_CONFIG.clientId,
          Username: email
        };
        await cognito.resendConfirmationCode(resendParams).promise();
        console.log(`📧 Verification email resent to: ${email}`);
      } catch (resendError) {
        console.log('Could not resend verification code:', resendError);
      }

    } catch (cognitoError: any) {
      console.error('Cognito creation error:', cognitoError);
      
      if (cognitoError.code === 'UsernameExistsException') {
        // User exists but might be unconfirmed - resend code
        try {
          const resendParams = {
            ClientId: COGNITO_CONFIG.clientId,
            Username: email
          };
          await cognito.resendConfirmationCode(resendParams).promise();
          console.log(`📧 Verification code resent to existing user: ${email}`);
          
          // Get existing user from Cognito
          const listUsersParams = {
            UserPoolId: COGNITO_CONFIG.userPoolId,
            Filter: `email = "${email}"`,
            Limit: 1
          };
          const listUsersResponse = await cognito.listUsers(listUsersParams).promise();
          if (listUsersResponse.Users && listUsersResponse.Users.length > 0) {
            cognitoSub = listUsersResponse.Users[0].Username!;
          }
        } catch (resendError) {
          return res.status(400).json({ error: 'User already exists. Please check your email for verification code.' });
        }
      } else if (cognitoError.code === 'InvalidPasswordException') {
        return res.status(400).json({ 
          error: 'Password does not meet security requirements.' 
        });
      } else {
        return res.status(500).json({ error: 'Failed to create admin in authentication system' });
      }
    }

    // Create admin in database (if not exists)
    const existingDbUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!existingDbUser && cognitoSub) {
      await prisma.user.create({
        data: {
          cognitoId: cognitoSub,
          name: name.trim(),
          email: email.toLowerCase(),
          role: 'admin',
          isActive: false,
        }
      });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Admin account created! Verification code sent to your email.',
      requiresVerification: true
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ 
      error: 'Failed to create admin account. Please try again.' 
    });
  }
});

// Get all admins
router.get('/admins', async (req: Request, res: Response) => {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });
    
    res.json({ admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Add this to your adminRoutes.ts
router.post('/resend-verification', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const resendParams = {
      ClientId: COGNITO_CONFIG.clientId,
      Username: email
    };

    await cognito.resendConfirmationCode(resendParams).promise();
    
    res.json({ 
      success: true, 
      message: 'Verification code resent to your email.' 
    });
    
  } catch (error: any) {
    console.error('Resend error:', error);
    
    if (error.code === 'UserNotFoundException') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(500).json({ error: 'Failed to resend verification code' });
  }
});

export default router;