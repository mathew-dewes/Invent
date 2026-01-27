/*
  Warnings:

  - Added the required column `reference` to the `CostLedger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CostLedger" ADD COLUMN     "reference" TEXT NOT NULL;
