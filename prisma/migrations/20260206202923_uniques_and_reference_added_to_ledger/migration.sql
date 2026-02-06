/*
  Warnings:

  - A unique constraint covering the columns `[sourceType,sourceId]` on the table `CostLedger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reference` to the `CostLedger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CostLedger" ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CostLedger_sourceType_sourceId_key" ON "CostLedger"("sourceType", "sourceId");
