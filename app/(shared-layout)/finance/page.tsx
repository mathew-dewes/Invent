import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FinanceTable } from "./_components/FinanceTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
import { FinanceType } from "@/generated/prisma/enums";
import ExportCSVButton from "./_components/exportCSVButton";

export default async function page({searchParams}:
  {searchParams: Promise<{type: FinanceType}>}
){

        const filters = ((await searchParams).type);
    return (
                <div>
  <div className="flex justify-end">
      <Link href={'#'}><ExportCSVButton/></Link>
      {/* On click of the button above to export all entries taking the search params as the query */}
       
      </div>
      <Suspense fallback={<TableSkeleton/>}>
        <FinanceTable filter={filters}  />
      </Suspense>
      <div>
        {/* Budget information can be placed here - Mirroring dashboard */}
        <Link href={'/finance/budget'}><Button className="cursor-pointer">Edit Budget</Button></Link>

      </div>
        </div>
    )
}
