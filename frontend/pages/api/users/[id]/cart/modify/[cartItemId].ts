import { modifyCartItem } from "@/services/cartItemService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    try {
      const { cartItemId } = req.query as { cartItemId: string };
      const { quantity, size, colorRgb } = req.body as {
        quantity?: number;
        size?: string;
        colorRgb?: string;
      };

      const updatedCartItem = await modifyCartItem(
        parseInt(cartItemId, 10),
        quantity,
        size,
        colorRgb,
      );

      if (updatedCartItem) {
        res.status(200).json(updatedCartItem);
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
