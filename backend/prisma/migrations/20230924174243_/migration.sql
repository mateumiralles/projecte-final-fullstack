/*
  Warnings:

  - You are about to drop the column `ammount` on the `ProductSummary` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `ProductSummary` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `ProductSummary` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProductSummary` table. All the data in the column will be lost.
  - You are about to drop the column `wishListId` on the `ProductSummary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cardNumber]` on the table `PaymentMethod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `ProductSummary` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductSummary" DROP CONSTRAINT "ProductSummary_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSummary" DROP CONSTRAINT "ProductSummary_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSummary" DROP CONSTRAINT "ProductSummary_wishListId_fkey";

-- DropIndex
DROP INDEX "ProductSummary_code_cartId_key";

-- DropIndex
DROP INDEX "ProductSummary_code_orderId_key";

-- DropIndex
DROP INDEX "ProductSummary_code_wishListId_key";

-- AlterTable
ALTER TABLE "ProductSummary" DROP COLUMN "ammount",
DROP COLUMN "cartId",
DROP COLUMN "orderId",
DROP COLUMN "size",
DROP COLUMN "wishListId";

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productSummaryCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishListItem" (
    "id" SERIAL NOT NULL,
    "wishListId" INTEGER NOT NULL,
    "productSummaryCode" TEXT NOT NULL,

    CONSTRAINT "WishListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productSummaryCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productSummaryCode_key" ON "CartItem"("cartId", "productSummaryCode");

-- CreateIndex
CREATE UNIQUE INDEX "WishListItem_wishListId_productSummaryCode_key" ON "WishListItem"("wishListId", "productSummaryCode");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productSummaryCode_key" ON "OrderItem"("orderId", "productSummaryCode");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_cardNumber_key" ON "PaymentMethod"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSummary_code_key" ON "ProductSummary"("code");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productSummaryCode_fkey" FOREIGN KEY ("productSummaryCode") REFERENCES "ProductSummary"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_productSummaryCode_fkey" FOREIGN KEY ("productSummaryCode") REFERENCES "ProductSummary"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productSummaryCode_fkey" FOREIGN KEY ("productSummaryCode") REFERENCES "ProductSummary"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
