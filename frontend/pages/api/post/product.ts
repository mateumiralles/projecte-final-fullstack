import { createProduct } from "@/services/productService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const productData = req.body;

      const newProduct = await createProduct(productData);

      res.status(201).json(newProduct);
    } catch (error: any) {
      if (error.message === "Product with the same code already exists") {
        res
          .status(400)
          .json({ message: "Product with the same code already exists" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    res.status(405).end();
  }
}
