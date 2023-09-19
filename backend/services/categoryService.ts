const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

interface CategoryData {
  name: string;
}

async function createCategory(data: CategoryData) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
      },
    });

    return newCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCategoryById(categoryId: number) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCategory(categoryId: number, categoryData: CategoryData) {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: categoryData,
    });
    return updatedCategory;
  } catch (error) {
    throw error;
  }
}

async function deleteCategory(categoryId: number) {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return deletedCategory;
  } catch (error) {
    throw error;
  }
}

export { createCategory, getCategoryById, updateCategory, deleteCategory };
