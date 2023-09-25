import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PaymentData {
  paymentMethodId: number;
  totalAmount: number;
  paymentTime: Date;
  userId: number;
  orderId: number;
}

async function createPayment(paymentData: PaymentData) {
  try {
    const newPayment = await prisma.payment.create({
      data: paymentData,
    });

    return newPayment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create payment");
  }
}

async function getUserPayments(userId: number) {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        userId: userId,
      },
    });
    return payments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user payments");
  }
}

export { createPayment, getUserPayments };
