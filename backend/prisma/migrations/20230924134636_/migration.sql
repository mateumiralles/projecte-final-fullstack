/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductSummary" DROP CONSTRAINT "ProductSummary_cartId_fkey";

-- AlterTable
ALTER TABLE "ProductSummary" ALTER COLUMN "cartId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WishList_userId_key" ON "WishList"("userId");

-- AddForeignKey
ALTER TABLE "ProductSummary" ADD CONSTRAINT "ProductSummary_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
