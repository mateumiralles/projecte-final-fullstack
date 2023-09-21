/*
  Warnings:

  - You are about to drop the column `name` on the `PaymentMethod` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "name";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
