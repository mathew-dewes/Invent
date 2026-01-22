/*
  Warnings:

  - You are about to alter the column `unitCost` on the `CostLedger` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `totalCost` on the `CostLedger` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `totalCost` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "CostLedger" ALTER COLUMN "unitCost" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "totalCost" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "totalCost" SET DATA TYPE DECIMAL(10,2);
