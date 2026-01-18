import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import PurchaseTable from "./_components/PurchaseTable";



export default  function RequestsPage(){

    console.log("Test");
    

    
    return (
        <div>
  <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Purchases</h1>
      <Link href={'/purchases/new'}><Button>Create Purchase</Button></Link>
       
      </div>
      <Suspense fallback={"Loading purchases..."}>
        <PurchaseTable />
      </Suspense>
        </div>
    )
}