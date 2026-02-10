import { getReadyRequests } from "@/lib/queries/request";
import ReadyRequestCard from "./ReadyRequestCard";


export default async function ReadyRequests(){

    const readyRequests = await getReadyRequests();

    if (readyRequests.length == 0) return
    
    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1`}>
    
    <ReadyRequestCard tableData={readyRequests}  headings={['Customer', 'Item', 'QTY']} title="Ready To Collect" description="Items have been picked and are ready to collect"/>
    
        
              
                
                        
        
        
        
        
        
        
        
        
        
        
             
        
                </div>
    )
}