import { Request, Response } from "express";
import {
  createProductSummary,
  deleteProductSummary,
  getProductSummary,
  updateProductSummary,
} from "../services/productSummaryService";

export async function createProductSummaryController(
  req: Request,
  res: Response
) {
  try {
    const productSummaryData = req.body;
    const newProductSummary = await createProductSummary(productSummaryData);
    return res.status(201).json(newProductSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateProductSummaryController(
  req: Request,
  res: Response
) {
  try {
    const { code } = req.params;
    const updates = req.body;
    const updatedProductSummary = await updateProductSummary(code, updates);
    return res.status(200).json(updatedProductSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteProductSummaryController(
  req: Request,
  res: Response
) {
  try {
    const { code } = req.params;
    const deletedProductSummary = await deleteProductSummary(code);
    return res.status(200).json(deletedProductSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductSummaryController(req: Request, res: Response) {
  try {
    const { code } = req.params;
    const productSummary = await getProductSummary(code);

    if (!productSummary) {
      return res.status(404).json({ message: "Product summary not found" });
    }

    return res.status(200).json(productSummary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
