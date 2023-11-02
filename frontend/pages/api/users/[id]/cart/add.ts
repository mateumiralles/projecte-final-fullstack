import { addCartItem } from "@/services/cartItemService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { cartId, img, productSummaryCode, quantity, size, colorRgb } =
        req.body as {
          cartId: number;
          img: string;
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
        colorRgb,
      );

      res.status(201).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
