-- DropIndex
DROP INDEX "Purchase_PO_key";

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "PO" SET DATA TYPE TEXT;
