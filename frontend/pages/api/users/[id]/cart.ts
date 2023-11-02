import { createCart, getCartByUserId } from "@/services/cartService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const cart = await getCartByUserId(parseInt(id as string, 10));
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const userId = parseInt(req.query.id as string, 10);
      const newCart = await createCart({ userId });

      return res.status(201).json(newCart);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
