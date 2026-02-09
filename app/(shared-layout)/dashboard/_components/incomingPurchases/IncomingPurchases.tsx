

import { getIncomingPurchases } from "@/lib/queries/purchase";
import IncomingStockCard from "./IncomingStockCard";

export default async function IncomingPurchases(){

    const purchases = await getIncomingPurchases();
    
    return (
        <div hidden={purchases.length == 0}  className={`border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1`}>
       
            <IncomingStockCard tableData={purchases}  headings={['Placed', 'Item', 'QTY', 'Customer']} title="Incoming Purchases" description="Order which have been placed"/>
         
        
        
        
                </div>
    )
}