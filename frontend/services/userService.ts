const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

interface UserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
}

async function createUser(data: UserData) {
  try {
    const { password, ...userData } = data;
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return Promise.reject("Account already exists");
    }

    const secretKey = "|owp1S%@VP7ke6";
    const cipher = crypto.createCipher("aes-256-cbc", secretKey);
    let encryptedText = cipher.update(password, "utf8", "hex");
    encryptedText += cipher.final("hex");

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: encryptedText,
      },
    });

    await prisma.cart.create({
      data: {
        userId: newUser.id,
      },
    });

    await prisma.wishList.create({
      data: {
        userId: newUser.id,
      },
    });

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserById(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateUser(userId: number, userData: UserData) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userData,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { error: "Incorrect email or password" };
    }
    if (user.token) {
      return { error: "User already logged in" };
    }

    const secretKey = "|owp1S%@VP7ke6";

    const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
    let decryptedText = decipher.update(user.password, "hex", "utf8");
    decryptedText += decipher.final("utf8");

    if (password == decryptedText) {
      const cart = await prisma.cart.findUnique({
        where: {
          userId: user.id,
        },
      });

      const token = uuidv4();

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          token: token,
        },
      });

      return { user, cart, token };
    } else {
      return { error: "Incorrect email or password" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
}

async function logout(userId: number) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        token: null,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to log out");
  }
}

export { createUser, getUserById, updateUser, login, logout };
