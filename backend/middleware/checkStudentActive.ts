import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    cognitoId: string;
  };
}

export const checkStudentActive = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "No token provided" 
      });
    }

    // Verify JWT token
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (jwtError) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid or expired token" 
      });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      include: { studentProfile: true }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      cognitoId: user.cognitoId,
    };

    // Only block students who are inactive
    // Admins can always access
    if (user.role === 'student' && !user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: "Your account is inactive. Please contact support to access course content.",
        code: "ACCOUNT_INACTIVE"
      });
    }

    next();
  } catch (error) {
    console.error("Error checking student status:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};