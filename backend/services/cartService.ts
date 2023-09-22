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
        items: true,
      },
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get cart");
  }
}

async function addProductSummaryToCart(
  cartId: number,
  productSummaryCode: string
) {
  try {
    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        items: {
          connect: { code: productSummaryCode },
        },
      },
    });

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add ProductSummary to cart");
  }
}

async function removeProductSummaryFromCart(
  cartId: number,
  productSummaryCode: string
) {
  try {
    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        items: {
          disconnect: [{ code: productSummaryCode }],
        },
      },
      include: {
        items: true,
      },
    });

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove ProductSummary from cart");
  }
}

async function resetCart(cartId: number) {
  try {
    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        items: {
          set: [],
        },
      },
      include: {
        items: true,
      },
    });

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the cart");
  }
}

export {
  createCart,
  getCartByUserId,
  addProductSummaryToCart,
  removeProductSummaryFromCart,
  resetCart,
};
