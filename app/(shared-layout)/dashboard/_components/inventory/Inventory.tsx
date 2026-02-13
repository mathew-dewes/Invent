

import { getInventoryChartData, getStockHealthPercentages, getStockValue } from "@/lib/queries/stock";
import StockHealthBar from "./StockHealthBar";
import { StockCountChart } from "../charts/StockCountChart";


export default async function Inventory(){

    const [percentage, chartData, stockValue] = await Promise.all([getStockHealthPercentages(), getInventoryChartData(), getStockValue()]);

    const stockCount = chartData.reduce((acc, cur) => acc + cur.count, 0)

      

    if (!chartData || chartData.length == 0) return
    
    return (
         <div className="border-2 p-5 rounded-xl bg-secondary col-span-1">
                
                                    <div>
                                          <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Inventory</h1>
                                            <StockHealthBar percentage={percentage}/>
                                            <StockCountChart data={chartData}  />
                                    </div>
               
           
                                </div>
    )
}