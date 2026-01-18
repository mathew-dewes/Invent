
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StockTable from "./_components/StockTable";
import { Suspense } from "react";



export default async function StockPage({searchParams}:
  {searchParams: Promise<{stock: string}>}
) {

  const filters = ((await searchParams).stock);

  console.log(filters);
  

  return (
    <div>

      <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Stock</h1>
      <Link href={'/stock/new'}><Button>Create Stock</Button></Link>
      
      </div>
      <Suspense fallback="Loading stock...">
      <StockTable filter={filters}/>
      </Suspense>

    </div>
  )
}