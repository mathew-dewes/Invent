import { getLowStock } from "@/lib/queries/stock"
import CriticalStockCard from "./CriticalStockCard"
import { getIncomingPurchases } from "@/lib/queries/purchase";

export default async function CriticalStock(){

    const [criticalStock, purchases] = await Promise.all([getLowStock(), getIncomingPurchases()])


    const noStockItems = criticalStock.filter((stock) => stock.quantity == 0).length > 0;
    const lowStockItems = criticalStock.filter((stock) => stock.quantity <= stock.reorderPoint).length > 0;


    

    const stockIds = criticalStock.map((item)=>{
        return item.id
        
    });

  

     const incomingPurchases = purchases.filter((purchase) => stockIds.includes(purchase.stockItem.id)).map((i)=>{
        return i.stockItem.id
    });

   
    

    
    return (
          <div hidden={criticalStock.length == 0} className={`border-2 p-5 rounded-xl bg-secondary`}>
            

         
                <CriticalStockCard 
                lowStockItems={lowStockItems}
                noStockItems={noStockItems}
                incomingPurchases={incomingPurchases} 
                tableData={criticalStock} 
                title="Critical Stock"
                 description="Items at or below reorder point"/>
                     
             
           
                

                   
                  
        
             
                   
         
        
               
        
        
        
        
                </div>
    )
}