import Link from "next/link"

import { StockTable } from "./_components/StockTable"
import { Button } from "@/components/ui/button"
import { getAllStock, getStockByStatusCount } from "@/lib/queries/stock"
import { Stockcolumns } from "./_components/Stockcolumns";


export default async function StockPage({searchParams}:
  {searchParams: Promise<{level: string}>}
) {

    const filters = ((await searchParams).level);
      const stock = await getAllStock(filters);
      const queryCounts = await getStockByStatusCount();
      
      

  return (
    <div>
       <div className="flex justify-end">
      <Link href={'/requests/new'}><Button>Create Request</Button></Link>
      </div>
      <StockTable queryCounts={queryCounts} filter={"name"} columns={Stockcolumns} data={stock} />
    </div>
  )
} 