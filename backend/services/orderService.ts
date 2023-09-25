import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface OrderData {
  userId: number;
}

async function createOrder(orderData: OrderData) {
  try {
    const newOrder = await prisma.order.create({
      data: {
        user: { connect: { id: orderData.userId } },
      },
    });

    const cartItems = await prisma.cartItem.findMany({
      where: { cart: { userId: orderData.userId } },
    });

    const orderItems = await Promise.all(
      cartItems.map(async (cartItem) => {
        const newOrderItem = await prisma.orderItem.create({
          data: {
            productSummary: { connect: { code: cartItem.productSummaryCode } },
            quantity: cartItem.quantity,
            colorRgb: cartItem.colorRgb,
            size: cartItem.size,
            order: { connect: { id: newOrder.id } },
          },
        });
        return newOrderItem;
      })
    );

    await prisma.cartItem.deleteMany({
      where: { cart: { userId: orderData.userId } },
    });

    return { order: newOrder, orderItems };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create order");
  }
}

async function getOrderByUserId(userId: number) {
  try {
    const order = await prisma.order.findFirst({
      where: { userId },
      include: {
        OrderItem: true,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get order");
  }
}

export { createOrder, getOrderByUserId };
