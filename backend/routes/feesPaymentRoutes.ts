import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Helper function to ensure email is a string
const getEmailString = (email: string | string[] | undefined): string | null => {
  if (!email) return null;
  return Array.isArray(email) ? email[0] : email;
};

// =============================
// 1️⃣ SAVE PAYMENT BEFORE PAYSTACK 
// =============================
router.post("/SaveFormData", async (req: Request, res: Response) => {
  try {
    const { email, semester, installment, firstName, lastName, phoneNumber, amount } = req.body;

    // Only require semester and installment
    if (!semester || !installment) {
      return res.status(400).json({ message: "Semester and installment are required" });
    }

    // Create a unique session ID for this payment attempt
    const sessionId = `${semester}_${installment}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // Create payment record with session ID
    const payment = await prisma.payment.create({
      data: {
        userId: null,
        email: "",  // Will be updated by webhook
        semester,
        installment,
        status: "pending",
        firstName: firstName || null,
        lastName: lastName || null,
        phoneNumber: phoneNumber || null,
        transactionId: sessionId, // Store session ID temporarily
      },
    });

    return res.json({ 
      success: true, 
      message: "Payment data saved successfully",
      paymentId: payment.id,
      sessionId: sessionId
    });
  } catch (err) {
    console.error("SaveFormData error:", err);
    res.status(500).json({ message: "Failed to save form data" });
  }
});

// =============================
// 2️⃣ PAYSTACK WEBHOOK - FIXED (Updates existing record, doesn't create new)
// =============================
router.post("/webhook", async (req: Request, res: Response) => {
  try {
    console.log("Webhook received:", JSON.stringify(req.body, null, 2));
    
    const { event, data } = req.body;
    
    // Always respond quickly to webhook
    res.sendStatus(200);
    
    // Only handle "charge.success" events
    if (event === "charge.success") {
      const { customer, reference, status, amount } = data;
      const { email, first_name, last_name, phone } = customer;
      
      console.log("Processing successful payment for email:", email);
      
      // Get metadata from webhook
      const metadata = data.metadata || {};
      let semester = metadata.semester;
      let installment = metadata.installment;
      
      // If metadata is a string, parse it
      if (typeof metadata === 'string') {
        try {
          const parsed = JSON.parse(metadata);
          semester = parsed.semester;
          installment = parsed.installment;
        } catch (e) {}
      }
      
      console.log("Looking for payment with:", { semester, installment, reference });
      
      // FIRST: Try to find by transactionId (if it was stored)
      let payment = null;
      if (reference) {
        payment = await prisma.payment.findFirst({
          where: {
            OR: [
              { transactionId: reference },
              { transactionId: { startsWith: `${semester}_${installment}_` } } // Find by session pattern
            ]
          },
        });
      }
      
      // SECOND: If not found, find by semester and installment (most recent pending)
      if (!payment && semester && installment) {
        payment = await prisma.payment.findFirst({
          where: {
            semester: semester,
            installment: installment,
            status: "pending",
          },
          orderBy: { createdAt: "desc" },
        });
      }
      
      // THIRD: If still not found, find any pending payment without email
      if (!payment) {
        payment = await prisma.payment.findFirst({
          where: {
            email: "",
            status: "pending",
          },
          orderBy: { createdAt: "desc" },
        });
      }
      
      if (payment) {
        // Find if user exists in database
        const user = await prisma.user.findUnique({ where: { email } });
        
        // UPDATE existing payment (DON'T CREATE NEW)
        const updatedPayment = await prisma.payment.update({
          where: { id: payment.id },
          data: {
            userId: user?.id || null,
            email: email,  // Update with real email from Paystack
            firstName: first_name || payment.firstName,
            lastName: last_name || payment.lastName,
            phoneNumber: phone || payment.phoneNumber,
            status: "paid",
            amount: parseFloat(amount) / 100,
            amountPaid: parseFloat(amount) / 100,
            transactionId: reference,
            paidAt: new Date(),
          },
        });
        
        console.log("✅ Payment UPDATED successfully for email:", email, "Payment ID:", updatedPayment.id);
      } else {
        console.log("⚠️ No pending payment found to update for:", { email, semester, installment });
        // Only create new if absolutely necessary (should not happen)
        const user = await prisma.user.findUnique({ where: { email } });
        
        const newPayment = await prisma.payment.create({
          data: {
            userId: user?.id || null,
            email: email,
            semester: semester || "Unknown",
            installment: installment || "Unknown",
            firstName: first_name || "",
            lastName: last_name || "",
            phoneNumber: phone || "",
            status: "paid",
            amount: parseFloat(amount) / 100,
            amountPaid: parseFloat(amount) / 100,
            transactionId: reference,
            paidAt: new Date(),
          },
        });
        
        console.log("⚠️ New payment CREATED (fallback):", newPayment.id);
      }
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
  }
});
// =============================
// 3️⃣ GET PAYMENT STATUS (Works for both users & guests)
// =============================
router.get("/payment-status/:email", async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    // Find all payments for this email (works for both users and guests)
    const payments = await prisma.payment.findMany({
      where: { email: email },
    });

    const result: any = {};

    payments.forEach((p) => {
      if (!result[p.semester]) result[p.semester] = {};
      result[p.semester][p.installment] = p.status;
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Error fetching payments" });
  }
});

// =============================
// 4️⃣ GET PAYMENT DETAILS BY EMAIL
// =============================
router.get("/payment-details/:email", async (req: Request, res: Response) => {
  try {
    const emailParam = req.params.email;
    const email = getEmailString(emailParam);
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const payments = await prisma.payment.findMany({
      where: { email: email },
      orderBy: { createdAt: "desc" },
    });
    
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payment data found for this email" });
    }
    
    res.status(200).json({ 
      email: email,
      payments: payments
    });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ message: "Failed to fetch payment details" });
  }
});

// =============================
// 5️⃣ GET ALL PAYMENTS (Admin only)
// =============================
router.get("/payments", async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      payments: payments,
    });
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Error fetching payments" });
  }
});

export default router;