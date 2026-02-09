import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
import { FinanceType } from "@/generated/prisma/enums";
import ExportCSVButton from "./_components/exportCSVButton";
import { TimeFrame } from "@/lib/types";
import FinanceWrapper from "./_components/FinanceWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";


export default async function page({searchParams}:
  {searchParams: Promise<{type: FinanceType, date: TimeFrame}>}
){

        const filters = ((await searchParams).type);
        const timeFrame = ((await searchParams).date);
        
          return (
                <div>
  <div className="flex justify-end">
    <div className="flex gap-3">
<Link className={buttonVariants({variant:"default"})} href={'/finance/cost-centres'}>Manage Cost Centres</Link>
     <ExportCSVButton timeFrame={timeFrame}/>
    </div>
    
       
      </div>
      <Suspense fallback={<TableSkeleton/>}>
      <FinanceWrapper filter={filters} timeFrame={timeFrame}/>
      </Suspense>

        </div>
    )
}
