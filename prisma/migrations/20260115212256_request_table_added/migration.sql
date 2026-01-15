-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('OPEN', 'PENDING', 'COMPLETE');

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer" TEXT NOT NULL,
    "requestNumber" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "plantNumber" TEXT NOT NULL,
    "note" TEXT,
    "stockId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_requestNumber_key" ON "Request"("requestNumber");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
