import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../services/categoryService";

export async function createCategoryController(req: Request, res: Response) {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Request body is missing or empty" });
    }

    const categoryData = req.body;

    const newCategory = await createCategory(categoryData);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCategoryByIdController(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await getCategoryById(categoryId);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateCategoryController(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    const categoryData = req.body;

    const updatedCategory = await updateCategory(categoryId, categoryData);

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json(updatedCategory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCategoryController(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);

    const deletedCategory = await deleteCategory(categoryId);

    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json({ message: "Category deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
