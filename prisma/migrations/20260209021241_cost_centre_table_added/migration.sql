/*
  Warnings:

  - You are about to drop the column `costCentre` on the `CostLedger` table. All the data in the column will be lost.
  - You are about to drop the column `costCentre` on the `Request` table. All the data in the column will be lost.
  - Added the required column `costCentreId` to the `CostLedger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costCentreId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CostLedger" DROP COLUMN "costCentre",
ADD COLUMN     "costCentreId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "costCentre",
ADD COLUMN     "costCentreId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CostCentre" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CostCentre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostCentre_code_key" ON "CostCentre"("code");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_costCentreId_fkey" FOREIGN KEY ("costCentreId") REFERENCES "CostCentre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostLedger" ADD CONSTRAINT "CostLedger_costCentreId_fkey" FOREIGN KEY ("costCentreId") REFERENCES "CostCentre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
