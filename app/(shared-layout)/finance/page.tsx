import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FinanceTable } from "./_components/FinanceTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
import { FinanceType } from "@/generated/prisma/enums";
import ExportCSVButton from "./_components/exportCSVButton";
import { TimeFrame } from "@/lib/types";
import BudgetBar from "../dashboard/_components/BudgetBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
        <FinanceTable filter={filters} timeFrame={timeFrame}  />
      </Suspense>
      <div>
        <Suspense fallback={"Loading budget..."}>
        <Card className="w-full max-w-sm mt-5" >
          <CardHeader>
            <CardTitle>Budget</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
          </CardHeader>
   
          <CardContent>
   <BudgetBar/>
          </CardContent>
                 <CardFooter>
           <Link href={'/finance/budget'}><Button variant={"outline"} className="cursor-pointer">Update Budget</Button></Link>
          </CardFooter>
   
        </Card>
        </Suspense>
     

     
     

      </div>
        </div>
    )
}
