import { getUserPayments } from "@/services/paymentService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query as { id: string };
      const payments = await getUserPayments(parseInt(id, 10));

      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
