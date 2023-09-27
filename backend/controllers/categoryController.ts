import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryByName,
  updateCategory,
} from "../services/categoryService";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;
    const newCategory = await createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error: any) {
    if (error.message === "Category with the same name already exists") {
      res
        .status(400)
        .json({ message: "Category with the same name already exists" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getCategoryByNameController = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryName = req.params.name;
    const category = await getCategoryByName(categoryName);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.name;
    const categoryData = req.body;
    const updatedCategory = await updateCategory(categoryName, categoryData);

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.name;
    const deletedCategory = await deleteCategory(categoryName);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
