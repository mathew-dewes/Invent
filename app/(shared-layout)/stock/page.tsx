import Link from "next/link"
import { Button } from "@/components/ui/button"

import StockWrapper from "./_components/StockWrapper";
import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";

export default async function page({searchParams}:
  {searchParams: Promise<{level: string}>}
) {


  return (
    <div>
       <div className="flex justify-end">
      <Link href={'/stock/new'}><Button>Create Stock</Button></Link>
      </div>
      <Suspense fallback={<TableSkeleton/>}>
      <StockWrapper searchParams={searchParams}/>
      </Suspense>

        </div>
  )
};
