import { deleteWishListItem } from "@/services/wishListItemService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    try {
      const { wishListItemId } = req.query as { wishListItemId: string };
      await deleteWishListItem(parseInt(wishListItemId, 10));
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
