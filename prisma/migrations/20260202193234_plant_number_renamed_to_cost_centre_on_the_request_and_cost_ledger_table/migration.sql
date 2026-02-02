/*
  Warnings:

  - You are about to drop the column `plantNumber` on the `CostLedger` table. All the data in the column will be lost.
  - You are about to drop the column `plantNumber` on the `Request` table. All the data in the column will be lost.
  - Added the required column `costCentre` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CostLedger" DROP COLUMN "plantNumber",
ADD COLUMN     "costCentre" TEXT;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "plantNumber",
ADD COLUMN     "costCentre" TEXT NOT NULL;
