import { logout } from "@/services/userService";
import { NextApiRequest, NextApiResponse } from "next";

export async function getUserByIdController(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = parseInt(req.query.id as string);

    const updatedUser = await logout(userId);

    if (updatedUser) {
      return res.status(200).json({ message: "Logged out successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
