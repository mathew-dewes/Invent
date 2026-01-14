import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/web/tables/DataTable";
import { Purchasecolumns } from "@/components/web/tables/PurchaseColumns";
import { Purchase } from "@/lib/types";
import Link from "next/link";

    async function getData(): Promise<Purchase[]> {
      // Fetch data from your API here.
      return [
     {
    orderNumber: 1334,
    purchaseDate: "12/12/12",
    vendor: "Bunnings Warehouse",
    stock: "Spoon",
    cost: 2,
    forfilled: false,
    id: "113",
    notes:"I like pies",
    quantity:2,
    reasoning:"None",
    status: "Open"

     }
  

      ]
    }


export default async function RequestsPage(){

    const data = await getData()
    return (
        <div>
  <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Purchases</h1>
      <Link href={'/purchases/new'}><Button>Create Purchase</Button></Link>
       
      </div>
            <DataTable data={data} columns={Purchasecolumns} filter="stock"/>
        </div>
    )
}