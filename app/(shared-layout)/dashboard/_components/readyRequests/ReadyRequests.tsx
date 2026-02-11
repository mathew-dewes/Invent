import { getLatestReadyRequests, getReadyRequestCount } from "@/lib/queries/request";
import ReadyRequestCard from "./ReadyRequestCard";


export default async function ReadyRequests(){

    const [readyRequests, totalReadyRequestCount] = await Promise.all([getLatestReadyRequests(), getReadyRequestCount()])


    if (readyRequests.length == 0) return
    
    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1`}>
    
    <ReadyRequestCard tableData={readyRequests} requestCount={totalReadyRequestCount} />
    
        
              
                
                        
        
        
        
        
        
        
        
        
        
        
             
        
                </div>
    )
}