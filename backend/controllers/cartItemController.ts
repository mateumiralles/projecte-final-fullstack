import { Request, Response } from "express";
import {
  addCartItem,
  deleteCartItem,
  modifyCartItem,
} from "../services/cartItemService";

export async function addCartItemController(req: Request, res: Response) {
  try {
    const { cartId, productSummaryCode, quantity, size } = req.body as {
      cartId: number;
      productSummaryCode: string;
      quantity: number;
      size: string;
    };

    const cartItem = await addCartItem(
      cartId,
      productSummaryCode,
      quantity,
      size
    );

    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCartItemController(req: Request, res: Response) {
  try {
    const { cartItemId } = req.params;
    await deleteCartItem(parseInt(cartItemId, 10));
    res.status(204).end(); // Respond with a success status code (204 No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function modifyCartItemController(req: Request, res: Response) {
  try {
    const { cartItemId } = req.params;
    const { quantity, size } = req.body as { quantity?: number; size?: string };

    const updatedCartItem = await modifyCartItem(
      parseInt(cartItemId, 10),
      quantity,
      size
    );

    if (updatedCartItem) {
      res.status(200).json(updatedCartItem);
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
