const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

interface UserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
}

async function createUser(data: UserData) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
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

export { createUser, getUserById, updateUser, deleteUser };
