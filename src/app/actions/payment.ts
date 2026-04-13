"use server";

import Razorpay from "razorpay";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

// Helper to get Razorpay instance
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys are missing from environment variables.");
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

/**
 * Creates a new Razorpay Order on the backend.
 * This is the first step in the payment flow.
 */
export async function createPaymentOrder(amount: number, userId: string, portfolioId?: string) {
  try {
    const razorpay = getRazorpayInstance();

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: `rect_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return { success: false, error: "Razorpay order creation failed" };
    }

    // Store the order in our database with status 'created'
    await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: amount,
        userId: userId,
        portfolioId: portfolioId || null,
        status: "created",
      },
    });

    return { success: true, orderId: order.id, amount: order.amount };
  } catch (error: any) {
    console.error("Order creation error:", error);
    return { success: false, error: error.message || "Failed to create order" };
  }
}

/**
 * Verifies the payment signature received from the frontend.
 * This ensures the payment was actually made through Razorpay.
 */
export async function verifyPayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay secret key is missing");
    }

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isMatch = expectedSignature === razorpaySignature;

    if (isMatch) {
      // Payment is verified! Update the status in our database
      await prisma.payment.update({
        where: { orderId: razorpayOrderId },
        data: {
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
          status: "captured",
        },
      });

      return { success: true };
    } else {
      // Signature mismatch - potential tampering
      await prisma.payment.update({
        where: { orderId: razorpayOrderId },
        data: { status: "failed" },
      });
      
      return { success: false, error: "Payment verification failed: Signature mismatch" };
    }
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return { success: false, error: error.message || "Verification process failed" };
  }
}
