import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-02-25.clover',
});

// =============================================
// WEBHOOK HANDLER
// =============================================
export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  console.log(`✅ Webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(200).json({ 
      received: true, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// =============================================
// HANDLE CHECKOUT SESSION COMPLETED - WITH INVOICE URL
// =============================================
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('🔄 Processing checkout.session.completed');

  const subscriptionId = session.subscription as string | null;
  const metadata = session.metadata || {};
  const customerEmail = session.customer_email || '';

  console.log('📝 Session data:', {
    id: session.id,
    mode: session.mode,
    customer_email: customerEmail,
    metadata: metadata,
    subscription: subscriptionId
  });

  const studentEmail = metadata?.studentEmail || customerEmail;

  if (!studentEmail) {
    console.error('❌ No student email found');
    return;
  }

  const student = await prisma.student.findUnique({
    where: { email: studentEmail }
  });

  if (!student) {
    console.error(`❌ Student not found with email: ${studentEmail}`);
    return;
  }

  const planId = metadata?.planId ? parseInt(metadata.planId) : null;
  
  if (!planId) {
    console.error('❌ No planId in metadata');
    return;
  }

  const plan = await prisma.subscriptionPlan.findUnique({
    where: { id: planId }
  });

  if (!plan) {
    console.error(`❌ Plan not found with ID: ${planId}`);
    return;
  }

  if (subscriptionId) {
    console.log(`📝 Creating subscription: ${subscriptionId}`);

    try {
      const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
      const subData = stripeSub as any;
      
      console.log('📝 Stripe subscription data:', {
        id: stripeSub.id,
        status: stripeSub.status,
        current_period_start: subData.current_period_start,
        current_period_end: subData.current_period_end
      });

      const existingSubscription = await prisma.studentSubscription.findUnique({
        where: { stripeSubscriptionId: subscriptionId }
      });

      if (existingSubscription) {
        console.log('ℹ️ Subscription already exists:', existingSubscription.id);
        return;
      }

      // ✅ Handle dates with proper fallbacks
      const now = new Date();
      const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      const periodStart = subData.current_period_start 
        ? new Date(subData.current_period_start * 1000)
        : now;

      const periodEnd = subData.current_period_end
        ? new Date(subData.current_period_end * 1000)
        : thirtyDaysLater;

      console.log('📝 Dates:', {
        periodStart: periodStart.toISOString(),
        periodEnd: periodEnd.toISOString()
      });

      // ✅ CREATE SUBSCRIPTION
      const dbSubscription = await prisma.studentSubscription.create({
        data: {
          studentId: student.id,
          userId: student.userId,
          planId: plan.id,
          stripeSubscriptionId: subscriptionId,
          status: stripeSub.status as any,
          amount: plan.price,
          currency: 'usd',
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: stripeSub.cancel_at_period_end || false,
          metadata: {
            stripeCustomerId: stripeSub.customer as string,
            checkoutSessionId: session.id
          }
        }
      });

      console.log(`✅ Subscription created: ${dbSubscription.id}`);

      // ✅ GET INVOICE URL FROM STRIPE
      let invoiceUrl = null;
      let invoiceNumber = null;
      try {
        const invoices = await stripe.invoices.list({
          subscription: subscriptionId,
          limit: 1,
          status: 'paid'
        });
        
        if (invoices.data.length > 0) {
          invoiceUrl = invoices.data[0].hosted_invoice_url || invoices.data[0].invoice_pdf || null;
          invoiceNumber = invoices.data[0].number || null;
          console.log('✅ Invoice URL found:', invoiceUrl);
        } else {
          console.log('ℹ️ No invoice found yet, will be available later');
        }
      } catch (error) {
        console.log('⚠️ Could not fetch invoice URL:', error);
      }

      // ✅ CREATE PAYMENT RECORD WITH INVOICE URL
      const initialPayment = await prisma.subscriptionPayment.create({
        data: {
          subscriptionId: dbSubscription.id,
          stripeInvoiceId: session.id,
          stripePaymentIntentId: session.payment_intent as string || null,
          amount: plan.price,
          currency: 'usd',
          status: 'succeeded',
          paymentDate: new Date(),
          invoiceUrl: invoiceUrl,
          invoiceNumber: invoiceNumber || `INV-${Date.now()}`
        }
      });
      console.log(`✅ Initial payment recorded: ${initialPayment.id} (Invoice: ${invoiceUrl || 'N/A'})`);

      // ✅ CREATE NOTIFICATION IMMEDIATELY
      const notification = await prisma.subscriptionNotification.create({
        data: {
          studentId: student.id,
          type: 'renewal',
          title: 'Subscription Activated',
          message: `Your ${plan.name} subscription has been activated successfully!`,
          read: false,
          data: {
            planName: plan.name,
            planId: plan.id,
            subscriptionId: dbSubscription.id,
            amount: plan.price,
            currency: 'usd',
            activatedAt: new Date().toISOString(),
            invoiceUrl: invoiceUrl
          }
        }
      });
      console.log(`✅ Notification created: ${notification.id}`);

      if (stripeSub.customer && !student.stripeCustomerId) {
        await prisma.student.update({
          where: { id: student.id },
          data: { stripeCustomerId: stripeSub.customer as string }
        });
      }

      console.log('✅ Checkout session completed - all records created!');

    } catch (error) {
      console.error('❌ Error creating subscription:', error);
    }
  } else {
    console.log('⚠️ No subscription ID in session, waiting for invoice.paid');
  }
}

// =============================================
// HANDLE INVOICE PAID - WITH NOTIFICATION IDEMPOTENCY
// =============================================
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('🔄 Processing invoice.paid');

  const subscriptionId = (invoice as any).subscription as string | null;
  
  console.log('📝 Invoice data:', {
    id: invoice.id,
    subscription: subscriptionId,
    customer_email: invoice.customer_email,
    amount_paid: invoice.amount_paid,
    status: invoice.status,
    billing_reason: invoice.billing_reason,
    payment_intent: (invoice as any).payment_intent
  });

  // ✅ If no subscription ID, this is the initial invoice that was already handled
  if (!subscriptionId) {
    console.log('ℹ️ Invoice has no subscription ID - this is the initial invoice already handled by checkout.session.completed');
    return;
  }

  const studentEmail = invoice.customer_email || '';

  if (!studentEmail) {
    console.error('❌ No student email in invoice');
    return;
  }

  console.log(`📝 Processing invoice for student: ${studentEmail}`);

  const student = await prisma.student.findUnique({
    where: { email: studentEmail }
  });

  if (!student) {
    console.error(`❌ Student not found with email: ${studentEmail}`);
    return;
  }

  // ✅ FIND SUBSCRIPTION
  let subscription = await prisma.studentSubscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId }
  });

  if (!subscription) {
    console.log('⚠️ Subscription not found, creating from invoice...');

    try {
      const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
      
      const priceId = stripeSub.items.data[0]?.price.id;
      const plan = await prisma.subscriptionPlan.findFirst({
        where: { stripePriceId: priceId }
      });

      if (!plan) {
        console.error('❌ Plan not found for price:', priceId);
        return;
      }

      const subData = stripeSub as any;
      const now = new Date();
      const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      const periodStart = subData.current_period_start 
        ? new Date(subData.current_period_start * 1000)
        : now;

      const periodEnd = subData.current_period_end
        ? new Date(subData.current_period_end * 1000)
        : thirtyDaysLater;

      subscription = await prisma.studentSubscription.create({
        data: {
          studentId: student.id,
          userId: student.userId,
          planId: plan.id,
          stripeSubscriptionId: subscriptionId,
          status: stripeSub.status as any,
          amount: plan.price,
          currency: 'usd',
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: stripeSub.cancel_at_period_end || false,
          metadata: {
            stripeCustomerId: invoice.customer as string,
            createdFromInvoice: invoice.id
          }
        }
      });

      console.log(`✅ Subscription created from invoice: ${subscription.id}`);
    } catch (error) {
      console.error('❌ Error creating subscription from invoice:', error);
      return;
    }
  }

  // ✅ CHECK IF PAYMENT ALREADY EXISTS (idempotency)
  const existingPayment = await prisma.subscriptionPayment.findFirst({
    where: { stripeInvoiceId: invoice.id }
  });

  if (existingPayment) {
    console.log(`ℹ️ Payment already recorded: ${existingPayment.id}`);
    return;
  }

  // ✅ CREATE PAYMENT RECORD
  const paymentIntentId = (invoice as any).payment_intent as string || null;
  const payment = await prisma.subscriptionPayment.create({
    data: {
      subscriptionId: subscription.id,
      stripeInvoiceId: invoice.id,
      stripePaymentIntentId: paymentIntentId,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency || 'usd',
      status: 'succeeded',
      paymentDate: new Date(),
      invoiceUrl: invoice.hosted_invoice_url || invoice.invoice_pdf || null,
      invoiceNumber: invoice.number || null
    }
  });

  console.log(`✅ Payment recorded for subscription: ${subscription.id} (Payment ID: ${payment.id})`);

  // ✅ UPDATE SUBSCRIPTION STATUS
  if (subscription.status !== 'active') {
    await prisma.studentSubscription.update({
      where: { id: subscription.id },
      data: { status: 'active' }
    });
  }

  // ✅ UPDATE PERIOD DATES
  try {
    const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
    const subData = stripeSub as any;
    const now = new Date();
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    await prisma.studentSubscription.update({
      where: { id: subscription.id },
      data: {
        currentPeriodStart: subData.current_period_start 
          ? new Date(subData.current_period_start * 1000)
          : now,
        currentPeriodEnd: subData.current_period_end
          ? new Date(subData.current_period_end * 1000)
          : thirtyDaysLater,
        cancelAtPeriodEnd: stripeSub.cancel_at_period_end || false
      }
    });
  } catch (error) {
    console.error('Error updating subscription periods:', error);
  }

  // ✅ CHECK IF NOTIFICATION ALREADY EXISTS (idempotency)
  const existingNotification = await prisma.subscriptionNotification.findFirst({
    where: {
      studentId: student.id,
      type: 'renewal',
      data: {
        path: ['amount'],
        equals: invoice.amount_paid / 100
      }
    }
  });

  if (existingNotification) {
    console.log(`ℹ️ Notification already created: ${existingNotification.id}`);
  } else {
    // ✅ CREATE NOTIFICATION
    const currencySymbol = invoice.currency === 'usd' ? '$' : 'GHS';
    const notification = await prisma.subscriptionNotification.create({
      data: {
        studentId: student.id,
        type: 'renewal',
        title: 'Payment Successful',
        message: `Your payment of ${currencySymbol}${(invoice.amount_paid / 100).toFixed(2)} was successful.`,
        read: false,
        data: {
          amount: invoice.amount_paid / 100,
          currency: invoice.currency || 'usd',
          paymentDate: new Date().toISOString(),
          invoiceUrl: invoice.hosted_invoice_url || invoice.invoice_pdf,
          subscriptionId: subscription.id
        }
      }
    });

    console.log(`✅ Payment notification created (ID: ${notification.id})`);
  }

  console.log('✅ Invoice paid processing complete!');
}

// =============================================
// HANDLE INVOICE PAYMENT FAILED
// =============================================
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('🔄 Processing invoice.payment_failed');

  const subscriptionId = (invoice as any).subscription as string | null;

  console.log('📝 Failed invoice data:', {
    id: invoice.id,
    subscription: subscriptionId,
    customer_email: invoice.customer_email,
    amount_due: invoice.amount_due
  });

  if (!subscriptionId) {
    console.log('ℹ️ Invoice has no subscription ID, skipping');
    return;
  }

  const studentEmail = invoice.customer_email || '';

  if (!studentEmail) {
    console.error('❌ No student email in invoice');
    return;
  }

  const student = await prisma.student.findUnique({
    where: { email: studentEmail }
  });

  if (!student) {
    console.error(`❌ Student not found: ${studentEmail}`);
    return;
  }

  const subscription = await prisma.studentSubscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId }
  });

  if (!subscription) {
    console.error(`❌ Subscription not found: ${subscriptionId}`);
    return;
  }

  // Update subscription status
  await prisma.studentSubscription.update({
    where: { id: subscription.id },
    data: { status: 'past_due' }
  });

  // Create failed payment record
  const paymentIntentId = (invoice as any).payment_intent as string || null;
  const payment = await prisma.subscriptionPayment.create({
    data: {
      subscriptionId: subscription.id,
      stripeInvoiceId: invoice.id,
      stripePaymentIntentId: paymentIntentId,
      amount: invoice.amount_due / 100,
      currency: invoice.currency || 'usd',
      status: 'failed',
      paymentDate: new Date()
    }
  });

  console.log(`⚠️ Failed payment recorded (Payment ID: ${payment.id})`);

  // Create notification
  await prisma.subscriptionNotification.create({
    data: {
      studentId: student.id,
      type: 'payment_failed',
      title: 'Payment Failed',
      message: `Your payment of $${(invoice.amount_due / 100).toFixed(2)} failed. Please update your payment method.`,
      read: false,
      data: {
        amount: invoice.amount_due / 100,
        failedDate: new Date().toISOString(),
        subscriptionId: subscription.id
      }
    }
  });

  console.log('⚠️ Payment failed notification sent');
}

// =============================================
// HANDLE SUBSCRIPTION UPDATED
// =============================================
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('🔄 Processing customer.subscription.updated');

  console.log('📝 Subscription updated:', {
    id: subscription.id,
    status: subscription.status
  });

  const dbSubscription = await prisma.studentSubscription.findUnique({
    where: { stripeSubscriptionId: subscription.id }
  });

  if (!dbSubscription) {
    console.error('❌ Subscription not found:', subscription.id);
    return;
  }

  const sub = subscription as any;
  const now = new Date();
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await prisma.studentSubscription.update({
    where: { id: dbSubscription.id },
    data: {
      status: subscription.status as any,
      currentPeriodStart: sub.current_period_start 
        ? new Date(sub.current_period_start * 1000)
        : now,
      currentPeriodEnd: sub.current_period_end
        ? new Date(sub.current_period_end * 1000)
        : thirtyDaysLater,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null
    }
  });

  console.log('✅ Subscription updated');
}

// =============================================
// HANDLE SUBSCRIPTION DELETED
// =============================================
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('🔄 Processing customer.subscription.deleted');

  console.log('📝 Subscription deleted:', {
    id: subscription.id,
    status: subscription.status
  });

  const dbSubscription = await prisma.studentSubscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
    include: { student: true, plan: true }
  });

  if (!dbSubscription) {
    console.error('❌ Subscription not found:', subscription.id);
    return;
  }

  await prisma.studentSubscription.update({
    where: { id: dbSubscription.id },
    data: {
      status: 'canceled',
      canceledAt: new Date()
    }
  });

  if (dbSubscription.student) {
    await prisma.subscriptionNotification.create({
      data: {
        studentId: dbSubscription.student.id,
        type: 'canceled',
        title: 'Subscription Canceled',
        message: `Your subscription to ${dbSubscription.plan.name} has been canceled.`,
        read: false,
        data: {
          planName: dbSubscription.plan.name,
          canceledDate: new Date().toISOString()
        }
      }
    });
  }

  console.log('✅ Subscription canceled');
}

export default { handleWebhook };