// import prisma from "@/lib/prisma";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/web/tables/DataTable";
import { Stock, Stockcolumns } from "@/components/web/tables/StockColumns";
import Link from "next/link";


async function getData(): Promise<Stock[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      quantity: 130,
      name: "3pc Skrew Driver set",
      status: "In Stock",
      category: "Hand tooling",
      location: "AA2",
      vendor: "Ideal eletrical",
      unitCost: 12.5,
      brand: 'Nike'
    },
    {
      id: "728ed52df",
      quantity: 2100,
      name: "pending",
      status: "Low Stock",
      category: "Hand tooling",
      location: "AA2",
      vendor: "Bunnings Warehouse",
      unitCost: 12.5,
      brand: 'Nike'
    },
    {
      id: "728ed5f2f",
      quantity: 0,
      name: "pending",
      status: "Out of Stock",
      category: "Hand tooling",
      location: "AA2",
      vendor: "Repco",
      unitCost: 12.5,
      brand: 'Nike'
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData();

  // const post = await prisma.post.findMany();
  // console.log(post[0].title);
  

  return (
    <div>

      <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Stock</h1>
      <Link href={'/stock/new'}><Button>Create Stock</Button></Link>
      
      </div>
      <DataTable filter="name" columns={Stockcolumns} data={data} />
    </div>
  )
}