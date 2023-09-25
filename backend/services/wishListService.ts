import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface wishListData {
  userId: number;
}

async function getWishListByUserId(userId: number) {
  try {
    const wishList = await prisma.wishList.findFirst({
      where: { userId },
      include: {
        WishListItem: true,
      },
    });

    return wishList;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get wishList");
  }
}

async function resetWishList(userId: number) {
  try {
    const wishList = await prisma.wishList.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!wishList) {
      throw new Error("WishList not found for the given user");
    }

    await prisma.wishListItem.deleteMany({
      where: {
        wishListId: wishList.id,
      },
    });

    const updatedWishList = await prisma.wishList.findFirst({
      where: { userId },
      include: {
        WishListItem: true,
      },
    });

    return updatedWishList;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the wishList");
  }
}

export { getWishListByUserId, resetWishList };
