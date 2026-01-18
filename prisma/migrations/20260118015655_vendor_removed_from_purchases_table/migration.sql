/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_vendorId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "vendorId";
