import express from "express";
import {
  createProductSummaryController,
  updateProductSummaryController,
  deleteProductSummaryController,
  getProductSummaryController,
} from "../controllers/productSummaryController";

const router = express.Router();

router.post("/", createProductSummaryController);
router.put("/:code", updateProductSummaryController);
router.delete("/:code", deleteProductSummaryController);
router.get("/:code", getProductSummaryController);

export default router;
