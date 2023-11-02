import { createCart } from "@/services/cartService";
import { getPaymentMethods } from "@/services/paymentMethodService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const userId = parseInt(req.query.id as string, 10);

      const paymentMethods = await getPaymentMethods(userId);

      res.json(paymentMethods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
