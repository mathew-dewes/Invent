import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FinanceTable } from "./_components/FinanceTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
import { FinanceType } from "@/generated/prisma/enums";

export default async function page({searchParams}:
  {searchParams: Promise<{type: FinanceType}>}
){

        const filters = ((await searchParams).type);
    return (
                <div>
  <div className="flex justify-end">
      <Link href={'/purchases/new'}><Button>Create Purchase</Button></Link>
       
      </div>
      <Suspense fallback={<TableSkeleton/>}>
        <FinanceTable filter={filters}  />
      </Suspense>
        </div>
    )
}
