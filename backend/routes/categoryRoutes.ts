import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  updateCategoryController,
} from "../controllers/categoryController";

const router = express.Router();

router.post("/", createCategoryController);
router.get("/:id", getCategoryByIdController);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;
