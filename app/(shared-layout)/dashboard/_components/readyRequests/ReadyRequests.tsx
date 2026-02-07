import { getReadyRequests } from "@/lib/queries/request";
import ReadyRequestCard from "./ReadyRequestCard";


export default async function ReadyRequests(){

    const readyRequests = await getReadyRequests();
    
    return (
        <div hidden={readyRequests.length == 0} className={`border-2 p-5 rounded-xl bg-secondary`}>
    
    <ReadyRequestCard tableData={readyRequests}  headings={['Customer', 'Item', 'QTY']} title="Ready To Collect" description="Items have been picked and are ready to collect"/>
    
        
              
                
                        
        
        
        
        
        
        
        
        
        
        
             
        
                </div>
    )
}