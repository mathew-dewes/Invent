import { RequestChart } from "./charts/RequestChart";
import RequestCard from "./RequestCard";


export default function Requests() {
    return (
        <div className="border-2 p-3 rounded-xl bg-secondary">
        <h1 className="font-semibold text-xl py-3 ml-1">Requests</h1>
            <div className="grid grid-cols-4 gap-3">
  <div className="col-span-2">
      <RequestChart/>
        </div>

                <div className="col-span-2 flex flex-col gap-5">
                      <div className="flex gap-3">
    <RequestCard title="COMPLETE" status="COMPLETE" />
    <RequestCard title="READY" status="READY" />

                </div>
     <div className="flex gap-3">
    <RequestCard title="OPEN" status="OPEN" />
    <RequestCard title="PENDING"  status="PENDING"/>
                </div>
   
                </div>

           

    
      
  
    
   
            </div>

        </div>
    )
}