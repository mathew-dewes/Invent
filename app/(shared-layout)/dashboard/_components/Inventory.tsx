import { getLowStock, getStockHealthPercentages } from "@/lib/queries/stock";
import StockHealthBar from "./inventory/StockHealthBar";
import CriticalStockCard from "./inventory/CriticalStockCard";
import IncomingStockCard from "./inventory/IncomingStockCard";
import { getIncomingPurchases } from "@/lib/queries/purchase";





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
            <StockHealthBar stockData={stockHealthData}/>
            {noConcern ? 
            <div className="mt-3">
                <h1>Well done!</h1>
            </div> : 
             <div className="mt-5 grid grid-cols-2 gap-3">
           {criticalStock.length > 0 && <CriticalStockCard noStockIds={isOrdered} tableData={criticalStock} headings={['Item', 'QTY', 'ROP', 'Vendor']} title="Low Stock" description="Items at or below reorder point"/>}
           {incomingPurchases.length > 0 && <IncomingStockCard tableData={incomingPurchases} headings={['Ordered', 'Item', 'QTY', 'Vendor']} title="Incoming Stock" description="Stock arriving from recent purchases"/>}
            </div>}
           
 

       




        </div>
    )
}