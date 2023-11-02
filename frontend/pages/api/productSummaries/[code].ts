import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteProductSummary,
  getProductSummary,
  updateProductSummary,
} from "@/services/productSummaryService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { code } = req.query as { code: string };
      const productSummary = await getProductSummary(code);

      if (!productSummary) {
        return res.status(404).json({ message: "Product summary not found" });
      }

      return res.status(200).json(productSummary);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { code } = req.query as { code: string };
      const updates = req.body;
      const updatedProductSummary = await updateProductSummary(code, updates);
      return res.status(200).json(updatedProductSummary);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { code } = req.query as { code: string };
      const deletedProductSummary = await deleteProductSummary(code);
      return res.status(200).json(deletedProductSummary);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
