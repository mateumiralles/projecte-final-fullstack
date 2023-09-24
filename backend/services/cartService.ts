import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CartData {
  userId: number;
}

async function createCart(cartData: CartData) {
  try {
    const newCart = await prisma.cart.create({
      data: {
        user: { connect: { id: cartData.userId } },
      },
    });

    return newCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create cart");
  }
}

async function getCartByUserId(userId: number) {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        CartItem: true,
      },
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get cart");
  }
}

export { createCart, getCartByUserId };
