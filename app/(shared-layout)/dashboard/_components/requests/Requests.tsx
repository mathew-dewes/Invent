import { getLatestOpenRequests, getLatestReadyRequests, getOpenRequestCount, getReadyRequestCount } from "@/lib/queries/request"

import PendingRequestCard from "./PendingRequestsCard"
import ReadyRequestCard from "./ReadyRequestCard"


export default async function Requests(){

        const [readyRequests, totalReadyRequestCount, openRequests, requestCount] = 
        await Promise.all([
            getLatestReadyRequests(), 
            getReadyRequestCount(), 
            getLatestOpenRequests(), 
            getOpenRequestCount()])

    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2">
  <div>
    <h1 className="font-semibold text-xl py-3 text-center md:text-left">Request Overview</h1>
             <div className="grid grid-cols-2 gap-5">
  <PendingRequestCard tableData={openRequests} requestCount={requestCount} />
  <ReadyRequestCard tableData={readyRequests} requestCount={totalReadyRequestCount} />
             
             </div>
             
                  

                </div>
            </div>

    )
}