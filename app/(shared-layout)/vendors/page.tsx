import { Button } from "@/components/ui/button";

import Link from "next/link";

import { VendorTable } from "./_components/VendorTable";
import { getVendors } from "@/lib/queries/vendor";
import { VendorColumns } from "./_components/VendorColumns";

export default  async function VendorPage(){

       const vendors = await getVendors();


    return(
        <div>
  <div className="flex justify-end">
      <Link href={'/vendors/new'}><Button>Create Vendor</Button></Link>
        
      </div>
      {/* <Suspense fallback={<TableSkeleton/>}> */}
  <VendorTable columns={VendorColumns} data={vendors} filter="name"/>
      {/* </Suspense> */}
          
        </div>
    )
}