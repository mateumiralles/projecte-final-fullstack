import { createUser } from "@/services/userService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
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
  } else {
    res.status(405).end();
  }
}
