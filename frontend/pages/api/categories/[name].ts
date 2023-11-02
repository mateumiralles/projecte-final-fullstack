import {
  deleteCategory,
  getCategoryByName,
  updateCategory,
} from "@/services/categoryService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const categoryName = req.query.name as string;
      const category = await getCategoryByName(categoryName);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const categoryName = req.query.name as string;
      const deletedCategory = await deleteCategory(categoryName);

      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const categoryName = req.query.name as string;
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
  } else {
    res.status(405).end();
  }
}
