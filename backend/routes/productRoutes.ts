import express from "express";
import {
  createProductController,
  getProductsByCategoryController,
  getProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
} from "../controllers/productController";

const router = express.Router();

router.post("/", createProductController);
router.get("/", getAllProductsController);
router.get("/category/:categoryName", getProductsByCategoryController);
router.get("/:code", getProductController);
router.put("/:code", updateProductController);
router.delete("/:code", deleteProductController);

export default router;
