/*
  Warnings:

  - You are about to alter the column `unitCost` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "unitCost" SET DATA TYPE DECIMAL(10,2);
