import { getOpenRequests } from "@/lib/queries/request";
import OpenRequestsCard from "./requests/OpenRequestsCard";

export default async function OpenRequests(){

    const openRequests = await getOpenRequests();
      const noConcern = openRequests.length == 0;
    return (
        <div hidden={noConcern} className={`border-2 p-5 rounded-xl bg-secondary`}>
       
        

            {openRequests.length > 0 && <OpenRequestsCard tableData={openRequests}  headings={['Placed', 'Item', 'QTY', 'Customer', 'Location']} title="Open Requests" description="Items at or below reorder point"/>}
         
        
        
        
                </div>
    )
}