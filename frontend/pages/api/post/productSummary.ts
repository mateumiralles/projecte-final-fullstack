import { createProductSummary } from "@/services/productSummaryService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const productSummaryData = req.body;
      const newProductSummary = await createProductSummary(productSummaryData);
      return res.status(201).json(newProductSummary);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
