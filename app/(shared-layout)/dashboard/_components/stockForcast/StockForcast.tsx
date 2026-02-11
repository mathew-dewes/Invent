
import { getDaysUntilStockout } from "@/lib/queries/finance";
import { StockForcastChart } from "./StockForcastChart";

export default async function StockForcast(){

    const forcast = await getDaysUntilStockout();

    if (!forcast || forcast.length == 0) return

    return (
         <div hidden={forcast.length == 0} className="border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1">
                  <div>
                       <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Stock Forcast</h1>
                
                        <StockForcastChart stock={forcast}/>
                            </div>
                </div>
    )
}