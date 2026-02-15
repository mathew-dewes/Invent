import { getCostCentreSpend } from "@/lib/queries/finance";
import { TopSpendingCostCentresChart } from "./TopSpendingCostCentresChart";
import { getPurchaseChartData } from "@/lib/queries/purchase";
import { TotalSpendChart } from "../charts/TotalSpendChart";

export default async function CostAnalysis(){

    const spend = await getCostCentreSpend();
    
        const data = await getPurchaseChartData();
    
    
    
    const totalSpend = spend.reduce((acc, item)=>{
        return acc + item._sum
    }, 0)


    


    if (spend.length == 0) return

    
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2">
          <div>
               <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Cost Analysis</h1>
                <div className="grid grid-cols-2 gap-5">
        <TotalSpendChart data={data}/>
        <TopSpendingCostCentresChart data={spend} totalSpend={totalSpend}/>
    
                </div>
        
                    </div>
        </div>
    )
}