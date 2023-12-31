import { Request, Response } from "express";
import {
  createCart,
  getCartByUserId,
  resetCart,
} from "../services/cartService";

export async function createCartController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);
    const newCart = await createCart({ userId });

    return res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCartByUserIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cart = await getCartByUserId(parseInt(id, 10));
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function resetCartController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedCart = await resetCart(parseInt(id, 10));

    if (updatedCart) {
      return res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
