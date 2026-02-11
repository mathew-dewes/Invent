
import { getLatestOpenRequests, getOpenRequestCount } from "@/lib/queries/request";
import OpenRequestsCard from "./OpenRequestsCard";


export default async function OpenRequests(){

    const [openRequests, requestCount] = await Promise.all([getLatestOpenRequests(), getOpenRequestCount()])
      const noConcern = openRequests.length == 0;

      if (noConcern) return
    return (
        <div  className={`border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1`}>
       
        

            <OpenRequestsCard tableData={openRequests} requestCount={requestCount} />
         
        
        
        
                </div>
    )
}