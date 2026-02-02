
import getRequestTableData, { getRequestChartData } from "@/lib/queries/request";
import { RequestChart } from "./charts/RequestChart";


import RequestTable from "./tables/RequestTable";


export default async function Requests() {

    const [chartData, tableDate] = await Promise.all([getRequestChartData(), getRequestTableData()])


    

    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3 ml-1">Requests</h1>

            <div className="grid grid-cols-1 gap-5">
                <div>
                    <RequestChart data={chartData} />
                </div>

                <div className="flex flex-col gap-3">
                    <RequestTable requests={tableDate} />









                </div>








            </div>

        </div>
    )
}