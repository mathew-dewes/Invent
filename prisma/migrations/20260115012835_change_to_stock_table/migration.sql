/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vendor_userId_name_key" ON "Vendor"("userId", "name");
