/*
  Warnings:

  - You are about to drop the column `colorName` on the `ProductSummary` table. All the data in the column will be lost.
  - You are about to drop the column `colorRgb` on the `ProductSummary` table. All the data in the column will be lost.
  - Added the required column `colorRgb` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "colorRgb" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "articleList" JSONB,
ADD COLUMN     "colors" JSONB;

-- AlterTable
ALTER TABLE "ProductSummary" DROP COLUMN "colorName",
DROP COLUMN "colorRgb";
