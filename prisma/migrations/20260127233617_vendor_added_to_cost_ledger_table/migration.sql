-- AddForeignKey
ALTER TABLE "CostLedger" ADD CONSTRAINT "CostLedger_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
