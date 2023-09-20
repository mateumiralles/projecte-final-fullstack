import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PaymentMethodData {
  name: string;
  isDefault: boolean;
  type: number;
  cardNumber: string;
  expirationDate: string;
  ownerName: string;
  userId: number;
}

async function createPaymentMethod(paymentMethodData: PaymentMethodData) {
  try {
    const newPaymentMethod = await prisma.paymentMethod.create({
      data: paymentMethodData,
    });

    await prisma.paymentMethod.update({
      where: {
        id: newPaymentMethod.id,
      },
      data: {
        user: {
          connect: {
            id: paymentMethodData.userId,
          },
        },
      },
    });

    return newPaymentMethod;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create payment method");
  }
}

async function getPaymentMethods(userId: number) {
  try {
    // Query the database to get payment methods associated with the user
    const paymentMethods = await prisma.paymentMethod.findMany({
      where: {
        userId,
      },
    });

    return paymentMethods;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch payment methods");
  }
}

export { createPaymentMethod, getPaymentMethods };
