import { getLowStock, getStockHealthPercentages } from "@/lib/queries/stock";
import StockHealthBar from "./inventory/StockHealthBar";
import InventoryAlertCard from "./inventory/InventoryAlertCard";
import CriticalStockCard from "./inventory/CriticalStockCard";





export default async function Inventory() {

    const stockHealthData = await getStockHealthPercentages();
    const criticalStock = await getLowStock();

    console.log(criticalStock);
    


    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3">Inventory</h1>
            <StockHealthBar stockData={stockHealthData}/>
            <div className="mt-5 grid grid-cols-2 gap-3">
           <CriticalStockCard tableData={criticalStock} headings={['Item', 'QTY', 'ROP', 'Vendor']} title="Critical - Low Stock" description="Items at or below reorder point"/>
            <InventoryAlertCard tableData={criticalStock} headings={['Item', 'QTY', 'Status', 'Vendor']} title="Incoming Stock" description="Stock arriving from recent purchases"/>
            </div>
 

       




        </div>
    )
}