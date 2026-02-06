import { RequestTrendChart } from "./charts/RequestTrendChart";

export default function CompletedRequests(){
    return (
              <div className="border-2 p-5 rounded-xl bg-secondary">
                    <div>
               <h1 className="font-semibold text-xl py-3 ml-1">Completed Requests</h1>
                <div className="ml-1 text-sm flex gap-2">
                <p>Average:</p>
                <p>Daily: 12 </p>
                <p>Monthly: 12</p>
                <p>Quarterly: 554 </p>
               </div>
                <RequestTrendChart/>
                    </div>
                   </div>
    )
}