import { getStockHealthPercentages } from "@/lib/queries/stock";
import StockHealthBar from "./inventory/StockHealthBar";
import InventoryAlertCard from "./inventory/InventoryAlertCard";





export default async function Inventory() {

    const stockHealthData = await getStockHealthPercentages();


    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3">Inventory</h1>
            <StockHealthBar stockData={stockHealthData}/>
            <div className="mt-5 grid grid-cols-3 gap-3">
           <InventoryAlertCard title="Critical - Low Stock" description="Hello"/>
           <InventoryAlertCard title="Block Requests" description="Hello" />
           <InventoryAlertCard title="Incoming Stock" description="Hello"/>
            </div>
 

       




        </div>
    )
}