import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { Suspense } from "react";

import { PurchaseStatus } from "@/generated/prisma/enums";
import { PurchaseTable } from "./_components/PurchaseTable";
import { Purchasecolumns } from "./_components/PurchaseColumns";
import { getPurchases, getPurchaseStatusCount } from "@/lib/queries/purchase";




export default  async function RequestsPage({searchParams}:
  {searchParams: Promise<{status: PurchaseStatus}>}
){

      const filters = ((await searchParams).status);

          const [purchases, statusCounts] = await Promise.all([getPurchases(filters), getPurchaseStatusCount()]);
        
    return (
        <div>
  <div className="flex justify-end">
      <Link href={'/purchases/new'}><Button>Create Purchase</Button></Link>
       
      </div>
      {/* <Suspense fallback={<TableSkeleton/>}> */}
        <PurchaseTable queryCounts={statusCounts} data={purchases} columns={Purchasecolumns} filter={"PO"} />
      {/* </Suspense> */}
        </div>
    )
}