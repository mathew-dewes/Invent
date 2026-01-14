import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/web/tables/DataTable";
import { Requestcolumns } from "@/components/web/tables/RequestColumns";
import { Request } from "@/lib/types";
import Link from "next/link";

    async function getData(): Promise<Request[]> {
      // Fetch data from your API here.
      return [
     {
    requestNumber: 1334,
    requestDate: "12/12/12",
    requestee: "Bob Marley",
    status: "Open",
    group: "Mobile",
    forfilled: false,
    id: "ddd",
    notes: "Awaiting stock",
    quantity: 2,
    item: "Hammer",
    plant: 126
     }
  

      ]
    }


export default async function RequestsPage(){

    const data = await getData()
    return (
        <div>
    <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Requests</h1>
      <Link href={'/requests/new'}><Button>Create Request</Button></Link>
        
      </div>
            <DataTable data={data} columns={Requestcolumns} filter="requestee"/>
        </div>
    )
}