import { getWishListByUserId } from "@/services/wishListService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const wishList = await getWishListByUserId(parseInt(id as string, 10));
      res.status(200).json(wishList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
