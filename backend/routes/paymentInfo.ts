// backend/routes/paymentInfo.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Add this helper function to determine the next due date
const calculateNextDueDate = (payments: any[]): { dueDate: string | null, semester: string | null, installment: string | null } => {
  // Define the payment structure
  const semesters = ['First Semester', 'Second Semester', 'Third Semester'];
  const installments = ['First Installment', 'Second Installment', 'Third Installment'];
  
  // Define expected amounts (you can move this to a config)
  const expectedAmounts = {
    'First Semester': { 'First Installment': 2000, 'Second Installment': 2000, 'Third Installment': 1920 },
    'Second Semester': { 'First Installment': 2000, 'Second Installment': 2000, 'Third Installment': 1920 },
    'Third Semester': { 'First Installment': 2000, 'Second Installment': 2000, 'Third Installment': 1920 },
  };

  // Find the next unpaid installment
  for (const semester of semesters) {
    for (const installment of installments) {
      const existingPayment = payments.find(
        p => p.semester === semester && p.installment === installment
      );
      
      // If this installment hasn't been paid
      if (!existingPayment) {
        // Calculate due date (e.g., 30 days from now for first installment, 60 for second, etc.)
        const installmentIndex = installments.indexOf(installment);
        const daysToAdd = (installmentIndex + 1) * 30; // 30, 60, 90 days
        const dueDate = new Date();
        
        // If this is the first installment and no payments exist, due in 30 days
        // For subsequent installments, due date can be based on last payment date
        if (payments.length > 0 && installmentIndex > 0) {
          // Get the last payment date for previous installments
          const lastPaid = payments
            .filter(p => p.semester === semester)
            .sort((a, b) => new Date(b.paidAt || b.createdAt).getTime() - new Date(a.paidAt || a.createdAt).getTime())[0];
          
          if (lastPaid) {
            const lastPaidDate = new Date(lastPaid.paidAt || lastPaid.createdAt);
            dueDate.setTime(lastPaidDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
          }
        } else {
          // First ever payment or first installment
          dueDate.setDate(dueDate.getDate() + daysToAdd);
        }
        
        return {
          dueDate: dueDate.toISOString(),
          semester,
          installment
        };
      }
    }
  }
  
  // All payments are complete
  return {
    dueDate: null,
    semester: null,
    installment: null
  };
};

// Modified GET /fees/:email route
router.get('/fees/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const emailAddress = Array.isArray(email) ? email[0] : email;

    if (!emailAddress) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Fetch all payments for this email
    const payments = await prisma.payment.findMany({
      where: {
        email: emailAddress,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Get user info if registered
    const user = await prisma.user.findFirst({
      where: { 
        email: emailAddress
      },
      include: { studentProfile: true },
    });

    // Calculate next due date
    const nextDue = calculateNextDueDate(payments);

    // Format response
    const formattedResponse = {
      userForm: {
        paystack: {
          records: payments.map(p => ({
            semester: p.semester,
            installment: p.installment,
            amountPaid: p.amountPaid,
            status: p.status,
            transactionId: p.transactionId,
            date: p.paidAt?.toISOString() || p.createdAt.toISOString(),
            dueDate: p.dueDate?.toISOString() || null, // Include the stored due date
          })),
        },
      },
      user: user ? {
        name: user.name,
        email: user.email,
      } : null,
      nextPayment: {
        dueDate: nextDue.dueDate,
        semester: nextDue.semester,
        installment: nextDue.installment,
      }
    };

    return res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error fetching payment info:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
// GET /payment-progress/:email
router.get('/payment-progress/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    
    // Convert to string and handle potential array
    const emailAddress = Array.isArray(email) ? email[0] : email;

    if (!emailAddress) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const payments = await prisma.payment.findMany({
      where: { 
        email: emailAddress
      },
    });

    const semesters = ['First Semester', 'Second Semester', 'Third Semester'];
    const installments = ['First Installment', 'Second Installment', 'Third Installment'];
    
    const expectedAmounts = {
      'First Semester': { 'First Installment': 2000, 'Second Installment': 2000, 'Third Installment': 1920 },
      'Second Semester': { 'First Installment': 2000, 'Second Installment': 2000, 'Third Installment': 1920 },
      'Third Semester': { 'First Installment': 2000, 'Second Installment': 2000, 'Third Installment': 1920 },
    };

    const paymentProgress: Record<string, number> = {};
    
    for (const semester of semesters) {
      let totalPaid = 0;
      let totalExpected = 0;
      
      for (const installment of installments) {
        const payment = payments.find(
          p => p.semester === semester && p.installment === installment
        );
        
        if (payment?.amountPaid) {
          totalPaid += payment.amountPaid;
        }
        
        totalExpected += expectedAmounts[semester][installment as keyof typeof expectedAmounts['First Semester']];
      }
      
      paymentProgress[semester] = totalExpected > 0 ? (totalPaid / totalExpected) * 100 : 0;
    }

    return res.status(200).json(paymentProgress);
  } catch (error) {
    console.error('Error fetching payment progress:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /create-payment
router.post('/create-payment', async (req: Request, res: Response) => {
  try {
    const {
      email,
      semester,
      installment,
      amountPaid,
      transactionId,
      status = 'completed',
      firstName,
      lastName,
      phoneNumber,
    } = req.body;

    if (!email || !semester || !installment) {
      return res.status(400).json({ error: 'Email, semester, and installment are required' });
    }

    // Find user if exists
    const user = await prisma.user.findFirst({
      where: { email: email as string },
    });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        email: email as string,
        userId: user?.id,
        semester: semester as string,
        installment: installment as string,
        amountPaid: amountPaid as number,
        transactionId: transactionId as string,
        status: status as string,
        firstName: firstName as string,
        lastName: lastName as string,
        phoneNumber: phoneNumber as string,
        paidAt: new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});





export default router;