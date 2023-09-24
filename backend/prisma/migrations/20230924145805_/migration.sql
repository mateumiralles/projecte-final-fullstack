/*
  Warnings:

  - A unique constraint covering the columns `[code,cartId]` on the table `ProductSummary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,wishListId]` on the table `ProductSummary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,orderId]` on the table `ProductSummary` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductSummary_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProductSummary_code_cartId_key" ON "ProductSummary"("code", "cartId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSummary_code_wishListId_key" ON "ProductSummary"("code", "wishListId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSummary_code_orderId_key" ON "ProductSummary"("code", "orderId");
