import express from "express";
import { createPaymentMethodController } from "../controllers/paymentMethodController";

const router = express.Router();

// Create a new payment method
router.post("/", createPaymentMethodController);

// Add other routes for payment methods as needed

export default router;
