/*
  Warnings:

  - A unique constraint covering the columns `[code,userId]` on the table `CostCentre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CostCentre_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "CostCentre_code_userId_key" ON "CostCentre"("code", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_userId_id_key" ON "Stock"("userId", "id");
