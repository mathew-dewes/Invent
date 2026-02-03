
import getRequestTableData from "@/lib/queries/request";


import RequestTable from "./tables/RequestTable";


export default async function Requests() {


const tableDate = await getRequestTableData()
    

    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3 ml-1">Open Requests</h1>
        
                    <RequestTable requests={tableDate} />










     

        </div>
    )
}