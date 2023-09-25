import { Request, Response } from "express";
import { Payment } from "@prisma/client";
import { getUserPayments, createPayment } from "../services/paymentService";

export async function getUserPaymentsController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const payments = await getUserPayments(parseInt(id, 10));

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createPaymentController(req: Request, res: Response) {
  try {
    const paymentData = req.body;
    const newPayment = await createPayment(paymentData);

    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
