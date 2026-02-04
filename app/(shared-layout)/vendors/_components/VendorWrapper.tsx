import { getVendors } from "@/lib/queries/vendor";
import { VendorColumns } from "./VendorColumns";
import { VendorTable } from "./VendorTable";

export default async function VendorWrapper(){
           const vendors = await getVendors();

    return <VendorTable columns={VendorColumns} data={vendors} filter="name"/>
               
}