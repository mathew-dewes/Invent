
import { convertToMoney } from "@/lib/helpers";


import { getMostRequestedChartData } from "@/lib/queries/request"
import { MostRequestedItemsChart } from "../charts/MostRequestedItemsChart";

export default async function MostRequested(){

  const requests = await getMostRequestedChartData();

  


  
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary">
        
                            <div>
                                  <h1 className="font-semibold text-xl py-3 ml-1">Most requested</h1>
                                             <div className="ml-1 text-sm flex gap-2 mb-3">
                                              <p>Average:</p>
                                              <p>Daily: {convertToMoney(12)} </p>
                                              <p>Monthly: {convertToMoney(12)} </p>
                                              <p>Quarterly: {convertToMoney(12)} </p>
                                             </div>
                                <MostRequestedItemsChart data={requests} />
                            </div>
       
   
                        </div>
    )
}