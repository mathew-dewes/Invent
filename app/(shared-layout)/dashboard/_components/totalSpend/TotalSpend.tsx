
import { getTotalSpend } from "@/lib/queries/purchase";
import { TotalSpendChart } from "../charts/TotalSpendChart";

export default async function TotalSpend(){

    const totalSpend = await getTotalSpend();

    const results = totalSpend.filter((i) => i.spend > 0)

    
if (results.length == 0) return
    
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1">
                    <div>
               <h1 className="font-semibold text-center md:text-left text-xl py-3 ml-1">Total Spend</h1>
         
                <TotalSpendChart data={totalSpend}/>
                    </div>
         
              
                   </div>
    )
}