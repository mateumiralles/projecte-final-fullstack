import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteProduct,
  getAllProducts,
  getProductByCode,
  getProductsByCategory,
  updateProduct,
} from "@/services/productService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { categoryName } = req.query;

      const products = await getProductsByCategory(categoryName as string);

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
