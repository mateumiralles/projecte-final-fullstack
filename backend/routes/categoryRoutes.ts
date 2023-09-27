import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByNameController,
  updateCategoryController,
} from "../controllers/categoryController";

const router = express.Router();

router.post("/", createCategoryController);
router.get("/:name", getCategoryByNameController);
router.put("/:name", updateCategoryController);
router.delete("/:name", deleteCategoryController);

export default router;
