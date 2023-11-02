import { addWishListItem } from "@/services/wishListItemService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { wishListId, productSummaryCode } = req.body as {
        wishListId: number;
        productSummaryCode: string;
      };

      const wishListItem = await addWishListItem(
        wishListId,
        productSummaryCode,
      );

      res.status(201).json(wishListItem);
    } catch (error: any) {
      if (error.message === "Item already exists in the wishlist") {
        res
          .status(400)
          .json({ message: "Item already exists in the wishlist" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    res.status(405).end();
  }
}
