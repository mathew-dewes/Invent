import { getLowStock, getStockHealthPercentages } from "@/lib/queries/stock";
import StockHealthBar from "./inventory/StockHealthBar";
import CriticalStockCard from "./inventory/CriticalStockCard";
import IncomingStockCard from "./inventory/IncomingStockCard";
import { getIncomingPurchases } from "@/lib/queries/purchase";
import { InventoryTable } from "./inventory/InventoryTable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";





export default async function Inventory() {

    const [stockHealthData, criticalStock, incomingPurchases] = await Promise.all([getStockHealthPercentages(), getLowStock(), getIncomingPurchases()]);

    const noStockIds = criticalStock.filter((i) => i.quantity == 0).map((i)=>{
        return i.id
    });

    const isOrdered = incomingPurchases.filter((purchase) => noStockIds.includes(purchase.stockItem.id)).map((i)=>{
        return i.stockItem.id
    });

    const noConcern = criticalStock.length == 0 && incomingPurchases.length == 0

    




    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3">Inventory</h1>
            <div>
       
   <StockHealthBar stockData={stockHealthData}/>
   <div hidden={!noConcern} className="mt-5">
   <p className="font-semibold">Stock levels:</p>
   <InventoryTable/>
   </div>

                
    

       <div hidden={noConcern} className="mt-5 grid grid-cols-1 gap-3">
            {criticalStock.length > 0 && <CriticalStockCard noStockIds={isOrdered} tableData={criticalStock} headings={['Item', 'QTY', 'ROP', 'Vendor']} title="Low Stock" description="Items at or below reorder point"/>}
           {incomingPurchases.length > 0 && <IncomingStockCard tableData={incomingPurchases} headings={['Ordered', 'Item', 'QTY', 'Vendor']} title="Incoming Stock" description="Stock arriving from recent purchases"/>}
        <div className="mt-2">
            <h2 className="font-semibold text-sm">Stock Levels:</h2>
            <Separator  className="mt-2 border"/>
                  <InventoryTable/>
                  <Button>View all stock</Button>

        </div>
  
       </div>
        
    
        
           
           
            </div>

     
           
 

       




        </div>
    )
}