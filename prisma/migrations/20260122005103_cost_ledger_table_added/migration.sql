-- CreateEnum
CREATE TYPE "FinanceType" AS ENUM ('REQUEST', 'PURCHASE');

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "totalCost" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "unitCost" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "CostLedger" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "FinanceType" NOT NULL,
    "requestId" TEXT,
    "purchaseId" TEXT,
    "stockId" TEXT NOT NULL,
    "vendorId" TEXT,
    "userId" TEXT NOT NULL,
    "plantNumber" TEXT,
    "stockName" TEXT NOT NULL,
    "vendorName" TEXT,
    "quantity" INTEGER NOT NULL,
    "unitCost" DECIMAL(65,30) NOT NULL,
    "totalCost" DECIMAL(65,30) NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "CostLedger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CostLedger" ADD CONSTRAINT "CostLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostLedger" ADD CONSTRAINT "CostLedger_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
