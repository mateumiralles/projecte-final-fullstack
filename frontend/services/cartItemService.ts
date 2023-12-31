import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addCartItem(
  cartId: number,
  img: string,
  productSummaryCode: string,
  quantity: number,
  size: string,
  colorRgb: string
) {
  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productSummaryCode,
        size,
        colorRgb,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });

      return updatedCartItem;
    }
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId,
        img,
        productSummaryCode,
        quantity,
        size,
        colorRgb,
      },
    });

    return cartItem;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add cart item");
  }
}

export async function deleteCartItem(cartItemId: number): Promise<void> {
  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete cart item");
  }
}

export async function modifyCartItem(
  cartItemId: number,
  newQuantity?: number,
  newSize?: string,
  newColorRgb?: string
) {
  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: {
        quantity: newQuantity,
        size: newSize,
        colorRgb: newColorRgb,
      },
    });

    return updatedCartItem;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to modify cart item");
  }
}
