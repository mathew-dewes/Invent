import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PurchaseStatus } from "@/generated/prisma/enums";

import PurchaseWrapper from "./_components/PurchaseWrapper";
import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";




export default  async function RequestsPage({searchParams}:
  {searchParams: Promise<{status: PurchaseStatus, search: string}>}
){

      const filters = ((await searchParams).status);
      const search = ((await searchParams).search) ?? "";

      

    return (
        <div>
  <div className="flex justify-end">
      <Link href={'/purchases/new'}><Button>Create Purchase</Button></Link>
       
      </div>
      <Suspense fallback={<TableSkeleton/>}>
     <PurchaseWrapper filter={filters} search={search}/>  
      </Suspense>

      
        </div>
    )
}