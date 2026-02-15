/*
  Warnings:

  - A unique constraint covering the columns `[stockId,isActive]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_stockId_isActive_key" ON "Purchase"("stockId", "isActive");
