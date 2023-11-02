import { createUser, getUserById, updateUser } from "@/services/userService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const id = req.query.id;
      const user = await getUserById(parseInt(id as string));

      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const userId = parseInt(req.query.id as string);
      const userData = req.body;

      const updatedUser = await updateUser(userId, userData);

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
