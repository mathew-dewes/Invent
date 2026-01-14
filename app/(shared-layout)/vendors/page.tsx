import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/web/tables/DataTable";
import { VendorColumns } from "@/components/web/tables/VendorColumns";
import prisma from "@/lib/prisma";
import { Vendor } from "@/lib/types";
import Link from "next/link";

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

    const vendors = await prisma.vendor.findMany();

    console.log(vendors);
    

      const data = await getData();

    return(
        <div>
  <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Vendors</h1>
      <Link href={'/vendors/new'}><Button>Create Vendor</Button></Link>
        
      </div>
            <DataTable filter="name" data={data} columns={VendorColumns}/>
        </div>
    )
}