import { columns, Stock, } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Stock[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      quantity: 130,
      name: "3pc Skrew Driver set",
      category: "Hand tooling",
      location: "AA2",
      vendor: "Ideal eletrical",
      unitCost: 12.5
    },
    {
      id: "728ed52df",
      quantity: 2100,
      name: "pending",
      category: "Hand tooling",
      location: "AA2",
      vendor: "Bunnings Warehouse",
      unitCost: 12.5
    },
    {
      id: "728ed5f2f",
      quantity: 10,
      name: "pending",
      category: "Hand tooling",
      location: "AA2",
      vendor: "Repco",
      unitCost: 12.5
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}