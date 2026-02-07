
import { StockCountChart } from "./charts/StockCountChart";
import StockHealthBar from "./inventory/StockHealthBar";
import { getInventoryChartData, getStockHealthPercentages } from "@/lib/queries/stock";

export default async function Inventory(){

    const [percentage, chartData] = await Promise.all([getStockHealthPercentages(), getInventoryChartData()]);

    
    
    return (
         <div className="border-2 p-5 rounded-xl bg-secondary">
                
                                    <div>
                                          <h1 className="font-semibold text-xl py-3 ml-1">Inventory</h1>
                                            <StockHealthBar percentage={percentage}/>
                                            <StockCountChart data={chartData} />
                                    </div>
               
           
                                </div>
    )
}