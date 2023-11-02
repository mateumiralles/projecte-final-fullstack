import { resetWishList } from "@/services/wishListService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { id } = req.query as { id: string };
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
  } else {
    res.status(405).end();
  }
}
