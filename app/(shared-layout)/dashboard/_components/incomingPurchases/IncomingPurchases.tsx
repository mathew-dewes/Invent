

import { getIncomingPurchases, getIncomingPurchasesCount } from "@/lib/queries/purchase";
import IncomingStockCard from "./IncomingStockCard";

export default async function IncomingPurchases(){

    const [purchases, totalIncomingPurchases] = await Promise.all([getIncomingPurchases(), getIncomingPurchasesCount()])


    if (purchases.length == 0) return
    
    return (
        <div  className={`border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1`}>
       
            <IncomingStockCard tableData={purchases} purchaseCount={totalIncomingPurchases}/>
         
        
        
        
                </div>
    )
}