/*
  Warnings:

  - You are about to drop the column `purchaseNumber` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PO]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PO` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Purchase_purchaseNumber_key";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseNumber",
ADD COLUMN     "PO" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_PO_key" ON "Purchase"("PO");
