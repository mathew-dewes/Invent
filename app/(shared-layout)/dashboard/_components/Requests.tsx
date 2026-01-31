
import { RequestChart } from "./charts/RequestChart";
import RequestCard from "./RequestCard";
import { getRequestCardData, getRequestChartData } from "@/lib/queries/request";


export default async function Requests() {

const [requests, chartData] = await Promise.all([getRequestCardData(), getRequestChartData()])

    const urgentRequestCount = requests.filter((i => (i.status !=="COMPLETE" && i.status !== "READY" ))).length
    const openRequests = requests.filter((i => i.status === "OPEN"));
    const readyRequests = requests.filter((i => i.status === "READY"));


    const noEntires = openRequests.length == 0 && readyRequests.length == 0;

    


    
  
    

    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary flex-1 ${noEntires ? "hidden" : ""}`}>
            <h1 className="font-semibold text-xl py-3 ml-1">Requests</h1>
            <div className="grid md:grid-cols-2 gap-3">
                <div className="col-span-1">
                    <RequestChart chartData={chartData} activeRequestCount={urgentRequestCount} />
                </div>

                <div className="col-span-1 flex flex-col gap-5">
                    <div className="flex flex-wrap gap-3">
                         {openRequests.length > 0 && <RequestCard title="Open" status="OPEN" total={openRequests.length} requests={openRequests}  />}
                         {readyRequests.length > 0 && <RequestCard title="Ready" status="READY" total={readyRequests.length} requests={readyRequests} />}
                   
                 
                  
             

                    </div>
                 
           


                </div>








            </div>

        </div>
    )
}