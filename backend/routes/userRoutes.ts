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
import {
  createCartController,
  getCartByUserIdController,
  resetCartController,
} from "../controllers/cartController";

const router = express.Router();

router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.post("/login", loginController);

// payment methods

router.get("/:id/payment-methods", getPaymentMethodsController);
router.post("/:id/cart", createCartController);
router.get("/:id/cart", getCartByUserIdController);
router.put("/:id/cart/reset", resetCartController);

export default router;
