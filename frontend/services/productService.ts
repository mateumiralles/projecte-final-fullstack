import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProductData {
  code: string;
  name: string;
  description: string;
  color?: any;
  whitePrice?: any;
  galleryDetails?: any[];
  careInstructions?: string[];
  compositions?: any[];
  materialDetails?: any[];
  variantsList?: any[];
  articleCountryOfProduction?: string | null;
  categoryId?: number | null;
}

async function createProduct(productData: ProductData) {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        code: productData.code,
      },
    });

    if (existingProduct) {
      throw new Error("Product with the same code already exists");
    }
    const newProduct = await prisma.product.create({
      data: productData,
    });
    return newProduct;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create product");
  }
}

async function getAllProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
}

async function getProductByCode(code: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { code },
    });
    return product;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch product");
  }
}

async function updateProduct(code: string, productData: ProductData) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { code },
      data: productData,
    });
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update product");
  }
}

async function deleteProduct(code: string) {
  try {
    await prisma.productSummary.deleteMany({
      where: { code },
    });

    const deletedProduct = await prisma.product.delete({
      where: { code },
    });

    return deletedProduct;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete product");
  }
}

async function getProductsByCategory(categoryName: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryName: categoryName,
      },
    });
    return products;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products by category");
  }
}

export {
  createProduct,
  getAllProducts,
  getProductByCode,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
