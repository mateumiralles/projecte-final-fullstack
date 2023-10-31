import { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/services/userService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

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
