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

async function resetCart(userId: number) {
  try {
    // Find the cart ID associated with the user ID
    const cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      throw new Error("Cart not found for the given user");
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    const updatedCart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        CartItem: true,
      },
    });

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the cart");
  }
}

export { createCart, getCartByUserId, resetCart };
