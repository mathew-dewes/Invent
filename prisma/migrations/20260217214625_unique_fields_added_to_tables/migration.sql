/*
  Warnings:

  - A unique constraint covering the columns `[userId,requestNumber]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,PONumber]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Request_requestNumber_key";

-- DropIndex
DROP INDEX "Vendor_PONumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Request_userId_requestNumber_key" ON "Request"("userId", "requestNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_userId_PONumber_key" ON "Vendor"("userId", "PONumber");
