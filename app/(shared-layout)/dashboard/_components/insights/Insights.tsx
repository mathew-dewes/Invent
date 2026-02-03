import { getPurchaseChartData } from "@/lib/queries/purchase";
import { PurchaseChart } from "../charts/PurchaseChart";
import { getRequestChartData } from "@/lib/queries/request";
import { RequestChart } from "../charts/RequestChart";

export default async function Insights() {


    const purchases = await getPurchaseChartData();
    const requests = await getRequestChartData()
    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3 ml-1">Insights</h1>
            <div className="grid grid-cols-2 gap-5">
                <PurchaseChart data={purchases} />

                <RequestChart data={requests} />


            </div>

        </div>
    )
}