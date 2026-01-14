import { DataTable } from "@/components/web/tables/DataTable";
import { VendorColumns } from "@/components/web/tables/VendorColumns";
import { Vendor } from "@/lib/types";

    async function getData(): Promise<Vendor[]> {
      // Fetch data from your API here.
      return [
     {
    name: "Bunnings warehouse",
    address: "123 bob St",
    contactPerson: 'Bob',
    email: 'fefefef0',
    id:"123",
    phoneNumber:'111'
     }
  

      ]
    }
export default async function VendorPage(){

      const data = await getData();

    return(
        <div>
        <h1 className="font-bold text-2xl" >Vendors</h1>
            <DataTable filter="name" data={data} columns={VendorColumns}/>
        </div>
    )
}