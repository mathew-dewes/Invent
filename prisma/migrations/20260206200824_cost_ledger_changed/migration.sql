/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `CostLedger` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `CostLedger` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `CostLedger` table. All the data in the column will be lost.
  - You are about to drop the column `requestee` on the `CostLedger` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `CostLedger` table. All the data in the column will be lost.
  - Added the required column `sourceId` to the `CostLedger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceType` to the `CostLedger` table without a default value. This is not possible if the table is not empty.
  - Made the column `costCentre` on table `CostLedger` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CostLedger" DROP COLUMN "purchaseId",
DROP COLUMN "reference",
DROP COLUMN "requestId",
DROP COLUMN "requestee",
DROP COLUMN "type",
ADD COLUMN     "sourceId" TEXT NOT NULL,
ADD COLUMN     "sourceType" "FinanceType" NOT NULL,
ALTER COLUMN "costCentre" SET NOT NULL;
