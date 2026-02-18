/*
  Warnings:

  - A unique constraint covering the columns `[purchaseNumber,userId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Purchase_purchaseNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_purchaseNumber_userId_key" ON "Purchase"("purchaseNumber", "userId");
