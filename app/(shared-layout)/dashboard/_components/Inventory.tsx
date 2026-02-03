import { getLowStock, getStockHealthPercentages } from "@/lib/queries/stock";
import StockHealthBar from "./inventory/StockHealthBar";
import CriticalStockCard from "./inventory/CriticalStockCard";
import IncomingStockCard from "./inventory/IncomingStockCard";
import { getIncomingPurchases } from "@/lib/queries/purchase";





export default async function Inventory() {

    const [stockHealthData, criticalStock, incomingPurchases] = await Promise.all([getStockHealthPercentages(), getLowStock(), getIncomingPurchases()])


    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3">Inventory</h1>
            <StockHealthBar stockData={stockHealthData}/>
            <div className="mt-5 grid grid-cols-2 gap-3">
           <CriticalStockCard tableData={criticalStock} headings={['Item', 'QTY', 'ROP', 'Vendor']} title="Low Stock" description="Items at or below reorder point"/>
           <IncomingStockCard tableData={incomingPurchases} headings={['Ordered', 'Item', 'QTY', 'Vendor']} title="Incoming Stock" description="Stock arriving from recent purchases"/>
            </div>
 

       




        </div>
    )
}