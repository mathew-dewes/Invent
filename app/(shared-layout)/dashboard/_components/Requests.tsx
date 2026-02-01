
import { RequestChart } from "./charts/RequestChart";
import PurchaseFulfillmentBar from "./PurchaseFulfillmentBar";
import getRequestTableData, { getRequestCardData, getRequestChartData } from "@/lib/queries/request";

import RequestTable from "./tables/RequestTable";


export default async function Requests() {

    const [requests, chartData, tableDate] = await Promise.all([getRequestCardData(), getRequestChartData(), getRequestTableData()])

    const openRequests = requests.filter((i => i.status === "OPEN"));
    const readyRequests = requests.filter((i => i.status === "READY"));


    const noEntires = openRequests.length == 0 && readyRequests.length == 0;

    






    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary flex-1 ${noEntires ? "hidden" : ""}`}>
            <h1 className="font-semibold text-xl py-3 ml-1">Requests</h1>
            <PurchaseFulfillmentBar />
            <div className="grid grid-cols-2 gap-5 mt-5">
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