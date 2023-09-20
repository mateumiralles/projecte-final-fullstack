// userRoutes.ts
import express from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  loginController,
  updateUserController,
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.post("/login", loginController);

export default router;
