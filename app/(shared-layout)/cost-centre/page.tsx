import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
import Link from "next/link";
import { Suspense } from "react";
import CostCentreWrapper from "./_components/costCentreWrapper";

export default async function page(){
    return (
        <div>
            <div className="flex justify-end">
                 <Link href={'/cost-centre/new'}><Button>Add Cost centre</Button></Link>
            </div>
            <Suspense fallback={<TableSkeleton/>}>
     
        <CostCentreWrapper/>
            </Suspense>
        </div>
    )
}