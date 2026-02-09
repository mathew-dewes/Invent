
import { getDaysUntilStockout } from "@/lib/queries/finance";
import { StockForcastChart } from "./StockForcastChart";

export default async function StockForcast(){

    const forcast = await getDaysUntilStockout();

    return (
         <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1">
                  <div>
                       <h1 className="font-semibold text-xl py-3 ml-1">Stock Forcast</h1>
                        <div className="ml-1 text-sm flex gap-2">
                        <p>Average:</p>
                        <p>Daily: 12 </p>
                        <p>Monthly: 12</p>
                        <p>Quarterly: 554 </p>
                       </div>
                        <StockForcastChart stock={forcast}/>
                            </div>
                </div>
    )
}