import { convertToMoney } from "@/lib/helpers";
import { TotalSpendChart } from "./charts/TotalSpendChart";

export default function TotalSpend(){
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary">
                    <div>
               <h1 className="font-semibold text-xl py-3 ml-1">Total Spend</h1>
               <div className="ml-1 text-sm flex gap-2">
                <p>Average:</p>
                <p>Daily: {convertToMoney(12)} </p>
                <p>Monthly: {convertToMoney(12)} </p>
                <p>Quarterly: {convertToMoney(12)} </p>
               </div>
                <TotalSpendChart/>
                    </div>
         
              
                   </div>
    )
}