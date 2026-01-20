import { PurchaseChart } from "./charts/PurchaseChart";
import PurchaseCard from "./PurchaseCard";


export default function Purchases() {
    return (
        <div className="border-2 p-3 rounded-xl bg-secondary">
        <h1 className="font-semibold text-xl py-3 ml-1">Purchases</h1>
            <div className="grid grid-cols-4 gap-3">
  <div className="col-span-2">
      <PurchaseChart/>
        </div>

                <div className="col-span-2 flex flex-col gap-5">
     <div className="flex gap-3">
    <PurchaseCard title="RECEIVED" status="RECEIVED" />
    <PurchaseCard title="PLACED" status="PLACED" />

                </div>

    <PurchaseCard title="DELAYED" status="DELAYED" />

            
                </div>

           

    
      
  
    
   
            </div>

        </div>
    )
}