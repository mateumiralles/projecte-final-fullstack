import { createCategory } from "@/services/categoryService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
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
  } else {
    res.status(405).end();
  }
}
