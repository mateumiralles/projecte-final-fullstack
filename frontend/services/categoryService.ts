const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

interface CategoryData {
  name: string;
}

async function createCategory(data: CategoryData) {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingCategory) {
      throw new Error("Category with the same name already exists");
    }

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

async function getCategoryByName(categoryName: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCategory(
  categoryName: string,
  categoryData: CategoryData
) {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        name: categoryName,
      },
      data: categoryData,
    });

    return updatedCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteCategory(categoryName: string) {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        name: categoryName,
      },
    });

    return deletedCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { createCategory, getCategoryByName, updateCategory, deleteCategory };
