/*
  Warnings:

  - A unique constraint covering the columns `[PONumber]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "completedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "completedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_PONumber_key" ON "Vendor"("PONumber");
