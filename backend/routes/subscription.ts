import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-02-25.clover',
});

// Helper function to safely get ID from params
const getParamId = (id: string | string[] | undefined): number => {
  if (typeof id === 'string') {
    return parseInt(id);
  }
  if (Array.isArray(id) && id.length > 0) {
    return parseInt(id[0]);
  }
  throw new Error('Invalid ID parameter');
};

// =============================================
// GET ALL PLANS
// =============================================
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const showAll = req.query.showAll === 'true';
    
    const plans = await prisma.subscriptionPlan.findMany({
      where: showAll ? {} : { isActive: true },
      include: {
        _count: {
          select: { subscriptions: true }
        }
      },
      orderBy: { price: 'asc' }
    });

    res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription plans'
    });
  }
});

// =============================================
// GET SINGLE PLAN
// =============================================
router.get('/plans/:id', async (req: Request, res: Response) => {
  try {
    const planId = getParamId(req.params.id);
    
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
      include: {
        _count: {
          select: { subscriptions: true }
        }
      }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch plan'
    });
  }
});

// =============================================
// CREATE PLAN (Admin only) - Auto-creates Stripe subscription
// =============================================
router.post('/create-plan', async (req: Request, res: Response) => {
  try {
    const { name, description, price, interval, programName } = req.body;

    if (!name || !price || !interval || !programName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, price, interval, programName'
      });
    }

    console.log('📝 Creating plan with Stripe subscription...');

    // ✅ Create product in Stripe
    const product = await stripe.products.create({
      name: name,
      description: description || `${name} subscription for ${programName}`,
      metadata: {
        programName: programName,
        currency: 'usd'
      }
    });

    // ✅ Create SUBSCRIPTION price (with recurring)
    const stripePrice = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(price * 100),
      currency: 'usd',
      recurring: {
        interval: interval as 'month' | 'year',
      },
      metadata: {
        planName: name,
        programName: programName
      }
    });

    console.log('✅ Subscription price created:', stripePrice.id);

    // ✅ Create plan in database
    const plan = await prisma.subscriptionPlan.create({
      data: {
        name,
        description,
        price,
        interval,
        programName,
        stripeProductId: product.id,
        stripePriceId: stripePrice.id,
        isActive: true
      }
    });

    console.log('✅ Plan created:', {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      interval: plan.interval,
      stripePriceId: stripePrice.id
    });

    res.json({
      success: true,
      data: plan,
      message: 'Plan created successfully with automatic Stripe subscription'
    });

  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create plan'
    });
  }
});

// =============================================
// 🔥 FIXED: Ensure plan has a valid Stripe subscription price
// =============================================
async function ensureSubscriptionPrice(plan: any) {
  console.log('🔍 ensureSubscriptionPrice called for plan:', plan.id, plan.name);
  
  // ✅ Check if existing price is valid first
  if (plan.stripePriceId && !plan.stripePriceId.startsWith('manual_')) {
    try {
      const price = await stripe.prices.retrieve(plan.stripePriceId);
      if (price.recurring && price.active) {
        console.log('✅ Using existing subscription price:', plan.stripePriceId);
        return plan.stripePriceId;
      } else {
        console.log('⚠️ Existing price is not a valid subscription price, creating new one');
      }
    } catch (error) {
      console.log('⚠️ Price not found, creating new one');
    }
  }
  
  // If no product ID, create one
  if (!plan.stripeProductId || plan.stripeProductId.startsWith('manual_')) {
    console.log('📝 Creating Stripe product for plan:', plan.name);
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description || `${plan.name} subscription for ${plan.programName}`,
      metadata: {
        programName: plan.programName || 'Unknown',
        currency: 'usd'
      }
    });
    plan.stripeProductId = product.id;
    
    await prisma.subscriptionPlan.update({
      where: { id: plan.id },
      data: { stripeProductId: product.id }
    });
  }

  // ✅ Create a NEW subscription price
  console.log('📝 Creating subscription price for:', plan.name);
  console.log('📝 Price amount:', plan.price);
  console.log('📝 Interval:', plan.interval);
  
  const newPrice = await stripe.prices.create({
    product: plan.stripeProductId,
    unit_amount: Math.round(plan.price * 100),
    currency: 'usd',
    recurring: {
      interval: plan.interval as 'month' | 'year',
    },
    metadata: {
      planName: plan.name,
      programName: plan.programName || 'Unknown'
    }
  });

  console.log('✅ Subscription price created:', newPrice.id);

  // Update plan with new price ID
  await prisma.subscriptionPlan.update({
    where: { id: plan.id },
    data: { stripePriceId: newPrice.id }
  });

  console.log('✅ Plan updated with new price ID');
  
  return newPrice.id;
}

// =============================================
// CREATE CHECKOUT SESSION - Auto creates subscription
// =============================================
router.post('/create-checkout', async (req: Request, res: Response) => {
  try {
    const {
      planId,
      studentEmail,
      studentName,
      programName,
      successUrl,
      cancelUrl
    } = req.body;

    console.log('📝 Create subscription checkout for:', { planId, studentEmail, studentName, programName });

    if (!planId || !studentEmail || !successUrl || !cancelUrl) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // ✅ GET PLAN
    let plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    if (!plan.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This plan is currently inactive'
      });
    }

    // ✅ Ensure plan has valid subscription price
    console.log('📝 Checking if plan has valid subscription price...');
    console.log('📝 Current price ID:', plan.stripePriceId);
    console.log('📝 Current product ID:', plan.stripeProductId);
    
    const priceId = await ensureSubscriptionPrice(plan);
    
    // Refresh plan to get updated data
    plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId }
    });
    
    console.log('📝 Using subscription price:', priceId);

    // ✅ FIND OR CREATE STUDENT
    let student = await prisma.student.findUnique({
      where: { email: studentEmail }
    });

    if (!student) {
      console.log('📝 Student not found, creating...');
      
      let user = await prisma.user.findUnique({
        where: { email: studentEmail }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            cognitoId: `temp_${Date.now()}`,
            name: studentName || 'Student',
            email: studentEmail,
            role: 'student'
          }
        });
      }

      student = await prisma.student.create({
        data: {
          userId: user.id,
          fullName: studentName || 'Student',
          email: studentEmail,
          phone: '',
          address: '',
          nationality: '',
          dob: new Date(),
          gender: 'other',
          profileImage: '',
          programName: programName || 'Unknown'
        }
      });
    }

    // ✅ CHECK IF ALREADY SUBSCRIBED
    const existingSubscription = await prisma.studentSubscription.findFirst({
      where: {
        studentId: student.id,
        status: 'active'
      }
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active subscription'
      });
    }

    // ✅ CREATE METADATA
    const metadata = {
      planId: plan.id.toString(),
      studentEmail: studentEmail,
      studentName: studentName || 'Student',
      programName: programName || 'Unknown'
    };

    console.log('📝 Metadata being sent:', metadata);

    // ✅ CREATE STRIPE CHECKOUT SESSION - SUBSCRIPTION MODE
    const session = await stripe.checkout.sessions.create({
      customer_email: studentEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata,
      subscription_data: {
        metadata: metadata
      }
    });

    console.log('✅ Subscription checkout session created:', {
      id: session.id,
      mode: session.mode,
      priceId: priceId,
      url: session.url
    });

    res.json({
      success: true,
      url: session.url,
      sessionId: session.id
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create checkout session'
    });
  }
});

// =============================================
// CHECK SUBSCRIPTION STATUS BY EMAIL
// =============================================
router.get('/check/:email', async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(req.params.email as string);

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        subscriptions: {
          where: {
            status: 'active'
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            plan: true,
            payments: {
              orderBy: { paymentDate: 'desc' },
              take: 1
            }
          }
        }
      }
    });

    if (!student) {
      return res.json({
        success: true,
        data: {
          hasActiveSubscription: false,
          subscription: null
        }
      });
    }

    const activeSubscription = student.subscriptions[0] || null;

    let lastPayment = null;
    if (activeSubscription && activeSubscription.payments.length > 0) {
      const payment = activeSubscription.payments[0];
      lastPayment = {
        amount: payment.amount,
        status: payment.status,
        paymentDate: payment.paymentDate,
        invoiceUrl: payment.invoiceUrl
      };
    }

    res.json({
      success: true,
      data: {
        hasActiveSubscription: !!activeSubscription,
        subscription: activeSubscription ? {
          id: activeSubscription.id,
          planName: activeSubscription.plan.name,
          status: activeSubscription.status,
          amount: activeSubscription.amount,
          currentPeriodEnd: activeSubscription.currentPeriodEnd,
          lastPayment: lastPayment
        } : null
      }
    });

  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check subscription status'
    });
  }
});

// =============================================
// GET STUDENT SUBSCRIPTION DETAILS
// =============================================
router.get('/student/:email', async (req: Request, res: Response) => {
  try {
    const email = decodeURIComponent(req.params.email as string);

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          include: {
            plan: true,
            payments: {
              orderBy: { paymentDate: 'desc' }
            }
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const activeSubscription = student.subscriptions.find(
      sub => sub.status === 'active' || sub.status === 'trialing'
    ) || student.subscriptions[0] || null;

    res.json({
      success: true,
      data: {
        activeSubscription,
        allSubscriptions: student.subscriptions
      }
    });

  } catch (error) {
    console.error('Error fetching student subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription details'
    });
  }
});

// =============================================
// CANCEL SUBSCRIPTION
// =============================================
router.post('/cancel', async (req: Request, res: Response) => {
  try {
    const { subscriptionId, cancelAtPeriodEnd } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Subscription ID is required'
      });
    }

    const subscription = await prisma.studentSubscription.findUnique({
      where: { id: parseInt(String(subscriptionId)) },
      include: { student: true }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // ✅ Cancel in Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: cancelAtPeriodEnd !== false
    });

    // Update in database
    await prisma.studentSubscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: cancelAtPeriodEnd !== false,
        canceledAt: new Date()
      }
    });

    if (subscription.student) {
      await prisma.subscriptionNotification.create({
        data: {
          studentId: subscription.student.id,
          type: 'canceled',
          title: 'Subscription Canceled',
          message: `Your subscription will be canceled at the end of the billing period.`,
          read: false,
          data: {
            subscriptionId: subscription.id,
            cancelAtPeriodEnd: cancelAtPeriodEnd !== false
          }
        }
      });
    }

    res.json({
      success: true,
      message: `Subscription will be canceled at period end`
    });

  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to cancel subscription'
    });
  }
});

// =============================================
// RESUME SUBSCRIPTION
// =============================================
router.post('/resume', async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Subscription ID is required'
      });
    }

    const subscription = await prisma.studentSubscription.findUnique({
      where: { id: parseInt(String(subscriptionId)) },
      include: { student: true }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // ✅ Resume in Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false
    });

    // Update in database
    await prisma.studentSubscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: false,
        canceledAt: null
      }
    });

    if (subscription.student) {
      await prisma.subscriptionNotification.create({
        data: {
          studentId: subscription.student.id,
          type: 'renewal',
          title: 'Subscription Resumed',
          message: `Your subscription has been resumed successfully.`,
          read: false,
          data: {
            subscriptionId: subscription.id
          }
        }
      });
    }

    res.json({
      success: true,
      message: 'Subscription resumed successfully'
    });

  } catch (error) {
    console.error('Error resuming subscription:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to resume subscription'
    });
  }
});

// =============================================
// UPDATE PLAN (Admin only)
// =============================================
router.put('/plans/:id', async (req: Request, res: Response) => {
  try {
    const planId = getParamId(req.params.id);
    const { name, description, price, interval, programName, isActive } = req.body;

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    const updatedPlan = await prisma.subscriptionPlan.update({
      where: { id: planId },
      data: {
        name: name || plan.name,
        description: description !== undefined ? description : plan.description,
        price: price || plan.price,
        interval: interval || plan.interval,
        programName: programName || plan.programName,
        isActive: isActive !== undefined ? isActive : plan.isActive
      }
    });

    res.json({
      success: true,
      data: updatedPlan,
      message: 'Plan updated successfully'
    });

  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update plan'
    });
  }
});

// =============================================
// TOGGLE PLAN ACTIVE STATUS
// =============================================
router.patch('/plans/:id/toggle', async (req: Request, res: Response) => {
  try {
    const planId = getParamId(req.params.id);
    const { isActive } = req.body;

    if (isActive === undefined) {
      return res.status(400).json({
        success: false,
        message: 'isActive is required'
      });
    }

    const plan = await prisma.subscriptionPlan.update({
      where: { id: planId },
      data: { isActive }
    });

    res.json({
      success: true,
      data: plan,
      message: `Plan ${isActive ? 'activated' : 'deactivated'} successfully`
    });

  } catch (error) {
    console.error('Error toggling plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle plan status'
    });
  }
});

// =============================================
// DELETE PLAN
// =============================================
router.delete('/plans/:id', async (req: Request, res: Response) => {
  try {
    const planId = getParamId(req.params.id);

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
      include: {
        _count: {
          select: { subscriptions: true }
        }
      }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    if (plan._count.subscriptions > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete plan with active subscriptions. Deactivate it instead.'
      });
    }

    await prisma.subscriptionPlan.delete({
      where: { id: planId }
    });

    res.json({
      success: true,
      message: 'Plan deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete plan'
    });
  }
});

// =============================================
// 📊 ADMIN: GET ALL SUBSCRIPTIONS WITH PAYMENTS
// =============================================
router.get('/admin/all', async (req: Request, res: Response) => {
  try {
    const subscriptions = await prisma.studentSubscription.findMany({
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                cognitoId: true,
                role: true
              }
            }
          }
        },
        plan: true,
        payments: {
          orderBy: { paymentDate: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format the response to include student image and user details
    const formattedSubscriptions = subscriptions.map(sub => ({
      id: sub.id,
      student: {
        id: sub.student.id,
        fullName: sub.student.fullName,
        email: sub.student.email,
        phone: sub.student.phone,
        address: sub.student.address,
        nationality: sub.student.nationality,
        programName: sub.student.programName,
        profileImage: sub.student.profileImage || '/default-avatar.png',
        user: sub.student.user ? {
          id: sub.student.user.id,
          name: sub.student.user.name,
          email: sub.student.user.email,
          role: sub.student.user.role
        } : null
      },
      plan: {
        id: sub.plan.id,
        name: sub.plan.name,
        description: sub.plan.description,
        price: sub.plan.price,
        interval: sub.plan.interval,
        programName: sub.plan.programName,
        isActive: sub.plan.isActive
      },
      status: sub.status,
      amount: sub.amount,
      currency: sub.currency,
      currentPeriodStart: sub.currentPeriodStart,
      currentPeriodEnd: sub.currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
      canceledAt: sub.canceledAt,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
      metadata: sub.metadata,
      payments: sub.payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        paymentDate: payment.paymentDate,
        invoiceUrl: payment.invoiceUrl,
        invoiceNumber: payment.invoiceNumber,
        stripeInvoiceId: payment.stripeInvoiceId,
        stripePaymentIntentId: payment.stripePaymentIntentId,
        createdAt: payment.createdAt
      }))
    }));

    res.json({
      success: true,
      data: formattedSubscriptions
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscriptions'
    });
  }
});

// =============================================
// 📊 ADMIN: GET ALL SUBSCRIPTION PAYMENTS
// =============================================
router.get('/admin/payments/all', async (req: Request, res: Response) => {
  try {
    const payments = await prisma.subscriptionPayment.findMany({
      include: {
        subscription: {
          include: {
            student: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                  }
                }
              }
            },
            plan: true
          }
        }
      },
      orderBy: { paymentDate: 'desc' }
    });

    const formattedPayments = payments.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      paymentDate: payment.paymentDate,
      invoiceUrl: payment.invoiceUrl,
      invoiceNumber: payment.invoiceNumber,
      stripeInvoiceId: payment.stripeInvoiceId,
      stripePaymentIntentId: payment.stripePaymentIntentId,
      createdAt: payment.createdAt,
      subscription: {
        id: payment.subscription.id,
        status: payment.subscription.status,
        amount: payment.subscription.amount,
        currency: payment.subscription.currency,
        currentPeriodStart: payment.subscription.currentPeriodStart,
        currentPeriodEnd: payment.subscription.currentPeriodEnd,
        student: {
          id: payment.subscription.student.id,
          fullName: payment.subscription.student.fullName,
          email: payment.subscription.student.email,
          phone: payment.subscription.student.phone,
          programName: payment.subscription.student.programName,
          profileImage: payment.subscription.student.profileImage || '/default-avatar.png',
          user: payment.subscription.student.user ? {
            id: payment.subscription.student.user.id,
            name: payment.subscription.student.user.name,
            email: payment.subscription.student.user.email,
            role: payment.subscription.student.user.role
          } : null
        },
        plan: {
          id: payment.subscription.plan.id,
          name: payment.subscription.plan.name,
          description: payment.subscription.plan.description,
          price: payment.subscription.plan.price,
          interval: payment.subscription.plan.interval,
          programName: payment.subscription.plan.programName
        }
      }
    }));

    res.json({
      success: true,
      data: formattedPayments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payments'
    });
  }
});

// =============================================
// 📊 ADMIN: GET SINGLE SUBSCRIPTION WITH DETAILS
// =============================================
router.get('/admin/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string); // ✅ Fixed: cast to string
    
    const subscription = await prisma.studentSubscription.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                cognitoId: true,
                role: true
              }
            }
          }
        },
        plan: true,
        payments: {
          orderBy: { paymentDate: 'desc' }
        }
      }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: subscription.id,
        student: {
          id: subscription.student.id,
          fullName: subscription.student.fullName,
          email: subscription.student.email,
          phone: subscription.student.phone,
          address: subscription.student.address,
          nationality: subscription.student.nationality,
          programName: subscription.student.programName,
          profileImage: subscription.student.profileImage || '/default-avatar.png',
          user: subscription.student.user ? {
            id: subscription.student.user.id,
            name: subscription.student.user.name,
            email: subscription.student.user.email,
            role: subscription.student.user.role
          } : null
        },
        plan: subscription.plan,
        status: subscription.status,
        amount: subscription.amount,
        currency: subscription.currency,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        canceledAt: subscription.canceledAt,
        createdAt: subscription.createdAt,
        updatedAt: subscription.updatedAt,
        metadata: subscription.metadata,
        payments: subscription.payments
      }
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription'
    });
  }
});

export default router;