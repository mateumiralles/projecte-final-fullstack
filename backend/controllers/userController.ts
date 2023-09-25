import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  login,
  logout,
  updateUser,
} from "../services/userService";

export async function createUserController(req: Request, res: Response) {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Request body is missing or empty" });
    }

    const userData = req.body;

    const newUser = await createUser(userData);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function getUserByIdController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUserController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const updatedUser = await updateUser(userId, userData);

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);

    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const result = await login(email, password);

    if (result.error) {
      return res.status(401).json({ message: result.error });
    }

    const { user, cart, token } = result;

    return res
      .status(200)
      .json({ message: "Login successful", user, cart, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);

    const updatedUser = await logout(userId);

    if (updatedUser) {
      return res.status(200).json({ message: "Logged out successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
