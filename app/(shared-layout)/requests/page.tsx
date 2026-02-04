import { Button } from "@/components/ui/button";import Link from "next/link";
import { RequestStatus } from "@/generated/prisma/enums";
import { RequestTable } from "./_components/RequestTable";
import { getRequests, getRequestsByStatusCount } from "@/lib/queries/request";
import { Requestcolumns } from "./_components/RequestColumns";


export default async function RequestsPage({searchParams}:
  {searchParams: Promise<{status: RequestStatus}>}
){

  const filters = ((await searchParams).status);

      const [requests, queryCounts] = await Promise.all([getRequests(filters), getRequestsByStatusCount()])



 
  


    return (
        <div>
    <div className="flex justify-end">
      <Link href={'/requests/new'}><Button>Create Request</Button></Link>
        
      </div>
      {/* <Suspense fallback={<TableSkeleton/>}> */}
        <RequestTable queryCounts={queryCounts} data={requests} columns={Requestcolumns} filter={"customer"}/>
      {/* </Suspense> */}

        </div>
    )
}