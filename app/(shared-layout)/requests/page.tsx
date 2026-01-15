import { Button } from "@/components/ui/button";import Link from "next/link";
import { Suspense } from "react";
import RequestTable from "./_components/RequestTable";

export default function RequestsPage(){

    return (
        <div>
    <div className="flex justify-between">
      <h1 className="font-bold text-2xl" >Requests</h1>
      <Link href={'/requests/new'}><Button>Create Request</Button></Link>
        
      </div>
      <Suspense fallback="Loading requests...">
        <RequestTable/>
      </Suspense>

        </div>
    )
}