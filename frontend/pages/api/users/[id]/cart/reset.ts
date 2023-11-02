import { resetCart } from "@/services/cartService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { id } = req.query as { id: string };
      const updatedCart = await resetCart(parseInt(id, 10));

      if (updatedCart) {
        return res.status(200).json(updatedCart);
      } else {
        return res.status(404).json({ message: "Cart not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
