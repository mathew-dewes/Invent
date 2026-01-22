/*
  Warnings:

  - You are about to alter the column `unitCost` on the `CostLedger` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `totalCost` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `unitCost` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "CostLedger" ALTER COLUMN "unitCost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "totalCost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "unitCost" SET DATA TYPE DOUBLE PRECISION;
