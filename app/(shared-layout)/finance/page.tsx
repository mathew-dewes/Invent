import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
import { FinanceType } from "@/generated/prisma/enums";
import ExportCSVButton from "./_components/exportCSVButton";
import { TimeFrame } from "@/lib/types";
import FinanceWrapper from "./_components/FinanceWrapper";


export default async function page({searchParams}:
  {searchParams: Promise<{type: FinanceType, date: TimeFrame}>}
){

        const filters = ((await searchParams).type);
        const timeFrame = ((await searchParams).date);
        
          return (
                <div>
  <div className="flex justify-end">
     <ExportCSVButton timeFrame={timeFrame}/>
       
      </div>
      <Suspense fallback={<TableSkeleton/>}>
      <FinanceWrapper filter={filters} timeFrame={timeFrame}/>
      </Suspense>

        </div>
    )
}
