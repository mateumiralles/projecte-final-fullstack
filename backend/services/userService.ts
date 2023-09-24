const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

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
      return Promise.reject('Account already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
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

async function deleteUser(userId: number) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
    });
    return { user, cart };
  } else {
    return null;
  }
}

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export { createUser, getUserById, updateUser, deleteUser, login };
