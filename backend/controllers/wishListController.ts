import { Request, Response } from "express";
import {
  getWishListByUserId,
  resetWishList,
} from "../services/wishListService";
export async function getWishListByUserIdController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const wishList = await getWishListByUserId(parseInt(id, 10));
    res.status(200).json(wishList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function resetWishListController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedWishList = await resetWishList(parseInt(id, 10));

    if (updatedWishList) {
      return res.status(200).json(updatedWishList);
    } else {
      return res.status(404).json({ message: "WishList not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
