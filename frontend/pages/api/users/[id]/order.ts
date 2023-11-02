import { createOrder, getOrderByUserId } from "@/services/orderService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query as { id: string };
      const order = await getOrderByUserId(parseInt(id, 10));
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const userId = parseInt(req.query.id as string, 10);
      const newOrder = await createOrder({ userId });

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
