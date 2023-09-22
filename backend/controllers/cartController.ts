import { Request, Response } from "express";
import {
  createCart,
  getCartByUserId,
  addProductSummaryToCart,
  removeProductSummaryFromCart,
  resetCart,
} from "../services/cartService";

export async function createCartController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10); // Parse userId from route params
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

export async function addProductSummaryToCartController(
  req: Request,
  res: Response
) {
  try {
    const { cartId, productSummaryCode } = req.body as {
      cartId: number;
      productSummaryCode: string;
    };
    const updatedCart = await addProductSummaryToCart(
      cartId,
      productSummaryCode
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeProductSummaryFromCartController(
  req: Request,
  res: Response
) {
  try {
    const { cartId, productSummaryCode } = req.body as {
      cartId: number;
      productSummaryCode: string;
    };
    const updatedCart = await removeProductSummaryFromCart(
      cartId,
      productSummaryCode
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function resetCartController(req: Request, res: Response) {
  try {
    const { cartId } = req.params;
    const updatedCart = await resetCart(parseInt(cartId, 10));
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
