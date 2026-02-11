

import { getInventoryChartData, getStockHealthPercentages } from "@/lib/queries/stock";
import StockHealthBar from "./StockHealthBar";
import { StockCountChart } from "../charts/StockCountChart";
import { getDaysUntilStockout } from "@/lib/queries/finance";

export default async function Inventory(){

    const [percentage, chartData] = await Promise.all([getStockHealthPercentages(), getInventoryChartData()]);

      const forcast = await getDaysUntilStockout();

      

    if (!chartData || chartData.length == 0) return
    
    return (
         <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1">
                
                                    <div>
                                          <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Inventory</h1>
                                            <StockHealthBar percentage={percentage}/>
                                            <StockCountChart data={chartData} forcast={forcast}  />
                                    </div>
               
           
                                </div>
    )
}