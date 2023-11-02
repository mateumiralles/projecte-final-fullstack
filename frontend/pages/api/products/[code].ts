import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteProduct,
  getProductByCode,
  updateProduct,
} from "@/services/productService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { code } = req.query;

      const product = await getProductByCode(code as string);

      if (!product) {
        return res.status(404).json({ message: "Product does not exist" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  } else if (req.method === "PUT") {
    try {
      const { code } = req.query;
      const updatedProductData = req.body;

      const updatedProduct = await updateProduct(
        code as string,
        updatedProductData,
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { code } = req.query;

      const deletedProduct = await deleteProduct(code as string);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(204).send({ message: "Product deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
