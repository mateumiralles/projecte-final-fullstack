import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCode,
  getProductsByCategory,
  updateProduct,
} from "../services/productService";

export async function createProductController(req: Request, res: Response) {
  try {
    const productData = req.body;

    const newProduct = await createProduct(productData);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllProductsController(req: Request, res: Response) {
  try {
    const products = await getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductController(req: Request, res: Response) {
  try {
    const { code } = req.params;

    const product = await getProductByCode(code);

    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export async function updateProductController(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const updatedProductData = req.body;

    const updatedProduct = await updateProduct(code, updatedProductData);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteProductController(req: Request, res: Response) {
  try {
    const { code } = req.params;

    const deletedProduct = await deleteProduct(code);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductsByCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { categoryName } = req.params;

    const products = await getProductsByCategory(categoryName);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
