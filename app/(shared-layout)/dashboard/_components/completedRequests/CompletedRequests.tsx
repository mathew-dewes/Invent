import { getRequestChartData } from "@/lib/queries/request";
import { RequestTrendChart } from "../charts/RequestTrendChart";


export default async function CompletedRequests(){

    const data = await getRequestChartData();

    const totalRequests = data.reduce((acc, cur) => acc + cur.requests, 0);



        if (totalRequests == 0) return
    
    return (
              <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 md:col-span-1">
                    <div>
               <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Requests</h1>
      
                <RequestTrendChart data={data}/>
                    </div>
                   </div>
    )
}