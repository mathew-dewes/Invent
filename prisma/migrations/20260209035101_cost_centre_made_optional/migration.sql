-- DropForeignKey
ALTER TABLE "CostLedger" DROP CONSTRAINT "CostLedger_costCentreId_fkey";

-- AlterTable
ALTER TABLE "CostLedger" ALTER COLUMN "costCentreId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CostLedger" ADD CONSTRAINT "CostLedger_costCentreId_fkey" FOREIGN KEY ("costCentreId") REFERENCES "CostCentre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
