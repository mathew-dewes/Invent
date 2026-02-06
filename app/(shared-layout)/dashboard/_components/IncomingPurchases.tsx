
import IncomingStockCard from "./inventory/IncomingStockCard";
import { getIncomingPurchases } from "@/lib/queries/purchase";

export default async function IncomingPurchases(){

    const openRequests = await getIncomingPurchases();
    return (
        <div  className={`border-2 p-5 rounded-xl bg-secondary`}>
       
        

            { <IncomingStockCard tableData={openRequests}  headings={['Placed', 'Item', 'QTY', 'Customer']} title="Incoming Purchases" description="Order which have been placed"/>}
         
        
        
        
                </div>
    )
}