import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface wishListData {
  userId: number;
}
