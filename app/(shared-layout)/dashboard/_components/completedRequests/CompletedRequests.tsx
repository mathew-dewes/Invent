import { getRequestChartData } from "@/lib/queries/request";
import { RequestTrendChart } from "../charts/RequestTrendChart";


export default async function CompletedRequests(){

    const data = await getRequestChartData();
    
    return (
              <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1">
                    <div>
               <h1 className="font-semibold text-xl py-3 ml-1">Requests</h1>
                <div className="ml-1 text-sm flex gap-2">
                <p>Average:</p>
                <p>Daily: 12 </p>
                <p>Monthly: 12</p>
                <p>Quarterly: 554 </p>
               </div>
                <RequestTrendChart data={data}/>
                    </div>
                   </div>
    )
}