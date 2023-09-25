import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProductSummaryData {
  img: string;
  price: number;
  currency: string;
  name: string;
  code: string;
}

async function createProductSummary(productSummaryData: ProductSummaryData) {
  try {
    const newProductSummary = await prisma.productSummary.create({
      data: productSummaryData,
    });

    return newProductSummary;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create product summary");
  }
}

async function updateProductSummary(
  code: string,
  updates: Partial<ProductSummaryData>
) {
  try {
    const updatedProductSummary = await prisma.productSummary.update({
      where: { code },
      data: updates,
    });

    return updatedProductSummary;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update product summary");
  }
}

async function deleteProductSummary(code: string) {
  try {
    const deletedProductSummary = await prisma.productSummary.delete({
      where: { code },
    });

    return deletedProductSummary;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete product summary");
  }
}

async function getProductSummary(code: string) {
  try {
    const productSummary = await prisma.productSummary.findUnique({
      where: { code },
    });

    return productSummary;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch product summary");
  }
}

export {
  getProductSummary,
  createProductSummary,
  deleteProductSummary,
  updateProductSummary,
};
