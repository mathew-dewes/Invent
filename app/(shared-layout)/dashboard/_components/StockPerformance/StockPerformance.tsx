
import { getMostRequestedChartData } from "@/lib/queries/request"
import { MostRequestedItemsChart } from "../charts/MostRequestedItemsChart";

export default async function StockPerformance(){

  const requests = await getMostRequestedChartData();

  const totalRequests = requests.reduce((acc, item)=>{
    return acc + item.requests
  }, 0);


  
  
  

  
if (requests.length == 0) return

  
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1">
        
                            <div>
                                  <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Stock Performance</h1>
                      
                                <MostRequestedItemsChart data={requests} issuedStock={totalRequests} />
                            </div>
       
   
                        </div>
    )
}