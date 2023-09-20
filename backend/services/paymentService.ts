import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PaymentData {
  paymentMethodId: number;
  totalAmount: number;
  paymentTime: Date;
  userId: number;
}

async function createPayment(paymentData: PaymentData) {
  try {
    const newPayment = await prisma.payment.create({
      data: {
        paymentMethodId: paymentData.paymentMethodId,
        totalAmount: paymentData.totalAmount,
        paymentTime: paymentData.paymentTime,
        user: {
          connect: {
            id: paymentData.userId, // Connect the payment to a user by their ID
          },
        },
      },
    });

    return newPayment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create payment");
  }
}

export { createPayment };
