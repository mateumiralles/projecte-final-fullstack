// userRoutes.ts
import express from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  loginController,
  updateUserController,
} from "../controllers/userController";
import { getPaymentMethodsController } from "../controllers/paymentMethodController";

const router = express.Router();

router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.post("/login", loginController);
router.get("/:id/payment-methods", getPaymentMethodsController);

export default router;
