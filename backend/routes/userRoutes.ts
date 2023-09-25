// userRoutes.ts
import express from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  loginController,
  logoutController,
  updateUserController,
} from "../controllers/userController";
import { getPaymentMethodsController } from "../controllers/paymentMethodController";
import {
  createCartController,
  getCartByUserIdController,
  resetCartController,
  // resetCartController,
} from "../controllers/cartController";
import {
  getWishListByUserIdController,
  resetWishListController,
} from "../controllers/wishListController";
import {
  addCartItemController,
  deleteCartItemController,
  modifyCartItemController,
} from "../controllers/cartItemController";
import {
  addWishListItemController,
  deleteWishListItemController,
} from "../controllers/wishListItemController";
import {
  createOrderController,
  getOrderByUserIdController,
} from "../controllers/orderController";
import { getUserPaymentsController } from "../controllers/paymentController";

const router = express.Router();

router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.post("/login", loginController);
router.post("/:id/logout", logoutController);

// payment methods

router.get("/:id/payment-methods", getPaymentMethodsController);
router.post("/:id/cart", createCartController);
router.get("/:id/cart", getCartByUserIdController);
router.get("/:id/wishList", getWishListByUserIdController);
router.post("/:id/order", createOrderController);
router.get("/:id/order", getOrderByUserIdController);
router.get("/:id/payments", getUserPaymentsController);

// cart
router.post("/:id/cart/add", addCartItemController);
router.delete("/:id/cart/delete/:cartItemId", deleteCartItemController);
router.put("/:id/cart/modify/:cartItemId", modifyCartItemController);
router.post("/:id/cart/reset", resetCartController);

// wishList

router.post("/:id/wishList/add", addWishListItemController);
router.delete(
  "/:id/wishList/delete/:wishListItemId",
  deleteWishListItemController
);
router.post("/:id/wishList/reset", resetWishListController);

export default router;
