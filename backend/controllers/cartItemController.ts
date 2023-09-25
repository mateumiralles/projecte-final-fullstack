import { Request, Response } from "express";
import {
  addCartItem,
  deleteCartItem,
  modifyCartItem,
} from "../services/cartItemService";

export async function addCartItemController(req: Request, res: Response) {
  try {
    const { cartId, img, productSummaryCode, quantity, size, colorRgb } =
      req.body as {
        cartId: number;
        img: string,
        productSummaryCode: string;
        quantity: number;
        size: string;
        colorRgb: string;
      };

    const cartItem = await addCartItem(
      cartId,
      img,
      productSummaryCode,
      quantity,
      size,
      colorRgb
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
    const { quantity, size, colorRgb } = req.body as {
      quantity?: number;
      size?: string;
      colorRgb?: string;
    };

    const updatedCartItem = await modifyCartItem(
      parseInt(cartItemId, 10),
      quantity,
      size,
      colorRgb
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
