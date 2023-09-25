import { Request, Response } from "express";
import {
  addWishListItem,
  deleteWishListItem,
} from "../services/wishListItemService";

export async function addWishListItemController(req: Request, res: Response) {
  try {
    const { wishListId, productSummaryCode } = req.body as {
      wishListId: number;
      productSummaryCode: string;
    };

    const wishListItem = await addWishListItem(wishListId, productSummaryCode);

    res.status(201).json(wishListItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteWishListItemController(
  req: Request,
  res: Response
) {
  try {
    const { wishListItemId } = req.params;
    await deleteWishListItem(parseInt(wishListItemId, 10));
    res.status(204).end(); // Respond with a success status code (204 No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
