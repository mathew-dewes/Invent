/*
  Warnings:

  - A unique constraint covering the columns `[purchaseNumber]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `purchaseNumber` on the `Purchase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseNumber",
ADD COLUMN     "purchaseNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_purchaseNumber_key" ON "Purchase"("purchaseNumber");
