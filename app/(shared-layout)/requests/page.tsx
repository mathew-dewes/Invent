import { Button } from "@/components/ui/button";import Link from "next/link";
import { Suspense } from "react";
import RequestTable from "./_components/RequestTable";
import { RequestStatus } from "@/generated/prisma/enums";

export default async function RequestsPage({searchParams}:
  {searchParams: Promise<{status: RequestStatus}>}
){

  const filters = ((await searchParams).status);


    return (
        <div>
    <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Requests</h1>
      <Link href={'/requests/new'}><Button>Create Request</Button></Link>
        
      </div>
      <Suspense fallback="Loading requests...">
        <RequestTable filter={filters}/>
      </Suspense>

        </div>
    )
}