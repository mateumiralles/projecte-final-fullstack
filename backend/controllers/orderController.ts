import { Request, Response } from "express";
import { createOrder, getOrderByUserId } from "../services/orderService";

export async function createOrderController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);
    const newOrder = await createOrder({ userId });

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOrderByUserIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await getOrderByUserId(parseInt(id, 10));
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
