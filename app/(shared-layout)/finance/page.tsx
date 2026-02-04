

import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
import { FinanceType } from "@/generated/prisma/enums";
import ExportCSVButton from "./_components/exportCSVButton";
import { TimeFrame } from "@/lib/types";
import { FinanceTable } from "./_components/FinanceTable";
import { getFinanceData, getFinanceTypeCount } from "@/lib/queries/finance";
import { Financecolumns } from "./_components/FinanceColumns";


export default async function page({searchParams}:
  {searchParams: Promise<{type: FinanceType, date: TimeFrame}>}
){

        const filters = ((await searchParams).type);
        const timeFrame = ((await searchParams).date);
        
        const [finances, financeTypeCount] = await Promise.all([getFinanceData(filters, timeFrame), getFinanceTypeCount()])
    return (
                <div>
  <div className="flex justify-end">
     <ExportCSVButton timeFrame={timeFrame}/>
       
      </div>
      <Suspense fallback={<TableSkeleton/>}>
        <FinanceTable queryCounts={financeTypeCount} data={finances} columns={Financecolumns} filter={"reference"} />
      </Suspense>

        </div>
    )
}
