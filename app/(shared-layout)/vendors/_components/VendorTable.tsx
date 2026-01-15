import { DataTable } from "@/components/web/tables/DataTable";
import { VendorColumns } from "@/components/web/tables/VendorColumns";
import { getVendors } from "@/lib/queries/vendor";

export default async function VendorTable(){

    const vendors = await getVendors();
    return (
        <DataTable filter="name" data={vendors} columns={VendorColumns}/>
    )
}