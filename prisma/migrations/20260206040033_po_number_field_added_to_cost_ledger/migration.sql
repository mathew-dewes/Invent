/*
  Warnings:

  - Added the required column `PONumber` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "PONumber" INTEGER NOT NULL;
