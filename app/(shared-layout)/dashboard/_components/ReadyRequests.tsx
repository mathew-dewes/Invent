import { getReadyRequests } from "@/lib/queries/request";

import ReadyRequestCard from "./requests/ReadyRequestCard";

export default async function ReadyRequests(){

    const readyRequests = await getReadyRequests();
      const noConcern = readyRequests.length == 0;
    return (
        <div hidden={noConcern} className={`border-2 p-5 rounded-xl bg-secondary`}>
    
        {readyRequests.length > 0 && <ReadyRequestCard tableData={readyRequests}  headings={['Customer', 'Item', 'QTY']} title="Ready To Collect" description="Items have been picked and are ready to collect"/>}
    
        
              
                
                        
        
        
        
        
        
        
        
        
        
        
             
        
                </div>
    )
}