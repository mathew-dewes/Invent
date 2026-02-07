import { getLowStock } from "@/lib/queries/stock"
import CriticalStockCard from "./inventory/CriticalStockCard"
import { getIncomingPurchases } from "@/lib/queries/purchase";

export default async function CriticalStock(){

    const criticalStock = await getLowStock();
    const incomingPurchases = await getIncomingPurchases();

        const noStockIds = criticalStock.filter((i) => i.quantity == 0).map((i)=>{
        return i.id
    });

     const isOrdered = incomingPurchases.filter((purchase) => noStockIds.includes(purchase.stockItem.id)).map((i)=>{
        return i.stockItem.id
    });
    return (
          <div hidden={criticalStock.length == 0} className={`border-2 p-5 rounded-xl bg-secondary`}>
            

         
                <CriticalStockCard noStockIds={isOrdered} tableData={criticalStock} headings={['Item', 'QTY', 'ROP', 'Vendor']} title="Critical Stock" description="Items at or below reorder point"/>
                     
             
           
                

                   
                  
        
             
                   
         
        
               
        
        
        
        
                </div>
    )
}