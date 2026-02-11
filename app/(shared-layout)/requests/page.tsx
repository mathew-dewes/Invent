import { Button } from "@/components/ui/button";import Link from "next/link";
import { RequestStatus } from "@/generated/prisma/enums";
import RequestWrapper from "./_components/RequestWrapper";
import { Suspense } from "react";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";


export default async function RequestsPage({searchParams}:
  {searchParams: Promise<{status: RequestStatus}>}
){

  const filters = ((await searchParams).status);

    return (
        <div>
    <div className="flex justify-end">
      <Link href={'/requests/new'}><Button size={"sm"}>Create Request</Button></Link>
        
      </div>

      <Suspense fallback={<TableSkeleton/>}>
   <RequestWrapper filter={filters}/>    
      </Suspense>

     

        </div>
    )
}