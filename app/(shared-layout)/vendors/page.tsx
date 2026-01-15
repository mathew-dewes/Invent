import { Button } from "@/components/ui/button";

import Link from "next/link";
import VendorTable from "./_components/VendorTable";
import { Suspense } from "react";

export default  function VendorPage(){


    return(
        <div>
  <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Vendors</h1>
      <Link href={'/vendors/new'}><Button>Create Vendor</Button></Link>
        
      </div>
      <Suspense fallback={"Loading vendors..."}>
        {/* Loading Skeleton to put here */}
  <VendorTable/>
      </Suspense>
          
        </div>
    )
}