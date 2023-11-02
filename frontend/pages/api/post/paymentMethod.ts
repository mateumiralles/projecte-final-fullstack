import { createPaymentMethod } from "@/services/paymentMethodService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const paymentMethodData = req.body;
      const newPaymentMethod = await createPaymentMethod(paymentMethodData);
      res.status(201).json(newPaymentMethod);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
