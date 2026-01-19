import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import PurchaseTable from "./_components/PurchaseTable";
import { PurchaseStatus } from "@/generated/prisma/enums";



export default  async function RequestsPage({searchParams}:
  {searchParams: Promise<{status: PurchaseStatus}>}
){

      const filters = ((await searchParams).status);

      console.log(filters);
      

    
    return (
        <div>
  <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Purchases</h1>
      <Link href={'/purchases/new'}><Button>Create Purchase</Button></Link>
       
      </div>
      <Suspense fallback={"Loading purchases..."}>
        <PurchaseTable filter={filters} />
      </Suspense>
        </div>
    )
}