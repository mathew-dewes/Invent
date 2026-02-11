import { Button } from "@/components/ui/button";

import Link from "next/link";
import VendorWrapper from "./_components/VendorWrapper";
import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";

export default  function VendorPage(){

    return(
        <div>
  <div className="flex justify-end">
      <Link href={'/vendors/new'}><Button size={"sm"}>Create Vendor</Button></Link>
        
      </div>
      <Suspense fallback={<TableSkeleton/>}>
<VendorWrapper/>
      </Suspense>
          
        </div>
    )
}