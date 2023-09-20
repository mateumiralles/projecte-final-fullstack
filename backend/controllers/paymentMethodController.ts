import { Request, Response } from "express";
import {
  createPaymentMethod,
  getPaymentMethods,
} from "../services/paymentMethodService";

async function createPaymentMethodController(req: Request, res: Response) {
  try {
    const paymentMethodData = req.body;
    const newPaymentMethod = await createPaymentMethod(paymentMethodData);
    res.status(201).json(newPaymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getPaymentMethodsController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);

    const paymentMethods = await getPaymentMethods(userId);

    res.json(paymentMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { createPaymentMethodController, getPaymentMethodsController };
