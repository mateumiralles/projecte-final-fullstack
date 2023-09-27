import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addWishListItem(
  wishListId: number,
  productSummaryCode: string
) {
  try {
    const existingWishListItem = await prisma.wishListItem.findFirst({
      where: {
        wishListId,
        productSummaryCode,
      },
    });
    if (existingWishListItem) {
      throw new Error("Item already exists in the wishlist");
    }

    const wishListItem = await prisma.wishListItem.create({
      data: {
        wishListId,
        productSummaryCode,
      },
    });

    return wishListItem;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add wishList item");
  }
}

export async function deleteWishListItem(
  wishListItemId: number
): Promise<void> {
  try {
    await prisma.wishListItem.delete({
      where: { id: wishListItemId },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete wishList item");
  }
}
