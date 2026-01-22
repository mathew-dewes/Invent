import { Button } from "@/components/ui/button";import Link from "next/link";
import { Suspense } from "react";
import RequestTable from "./_components/RequestTable";
import { RequestStatus } from "@/generated/prisma/enums";
import TableSkeleton from "@/components/web/skeletons/TableSkeleton";
export default async function RequestsPage({searchParams}:
  {searchParams: Promise<{status: RequestStatus}>}
){

  const filters = ((await searchParams).status);


 
  


    return (
        <div>
    <div className="flex justify-end">
      <Link href={'/requests/new'}><Button>Create Request</Button></Link>
        
      </div>
      <Suspense fallback={<TableSkeleton/>}>
        <RequestTable filter={filters}/>
      </Suspense>

        </div>
    )
}