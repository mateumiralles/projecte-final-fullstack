/*
  Warnings:

  - You are about to drop the column `userId` on the `ProductSummary` table. All the data in the column will be lost.
  - Made the column `cartId` on table `ProductSummary` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductSummary" DROP CONSTRAINT "ProductSummary_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSummary" DROP CONSTRAINT "ProductSummary_userId_fkey";

-- AlterTable
ALTER TABLE "ProductSummary" DROP COLUMN "userId",
ALTER COLUMN "cartId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductSummary" ADD CONSTRAINT "ProductSummary_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
