import { MonthlySpendChart } from "./charts/MonthlySpendChart";
import { VendorChart } from "./charts/VendorChart";

export default function MonthlySpend(){
    return (
              <div className="border-2 p-3 rounded-xl bg-secondary">
        <h1 className="font-semibold text-xl py-3 ml-1">Monthly Spend</h1>
                    <div className="grid grid-cols-2 gap-5 justify-between">
               
        <MonthlySpendChart/>
        <VendorChart/>
        
                    </div>
              
            
                
           
                </div>
    )
    
}