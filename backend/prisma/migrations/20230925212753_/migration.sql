/*
  Warnings:

  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,productSummaryCode,size,colorRgb]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorRgb` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropIndex
DROP INDEX "OrderItem_orderId_productSummaryCode_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "colorRgb" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId";

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productSummaryCode_size_colorRgb_key" ON "OrderItem"("orderId", "productSummaryCode", "size", "colorRgb");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
