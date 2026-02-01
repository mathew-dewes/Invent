import { getPurchaseChartData, getPurchaseTableData } from "@/lib/queries/purchase";
import { PurchaseChart } from "./charts/PurchaseChart";
import PurchaseFulfillmentBar from "./PurchaseFulfillmentBar";

import PurchaseTable from "./tables/PurchaseTable";


export default async function Purchases() {

    const [chartData, tableData] = await Promise.all([getPurchaseChartData(), getPurchaseTableData()]);




    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary flex-1`}>

            <h1 className="font-semibold text-xl py-3 ml-2">Purchases</h1>
            <PurchaseFulfillmentBar />





            <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                    <PurchaseChart data={chartData} />
                </div>

                <div>
       <PurchaseTable purchases={tableData} />

        









                </div>








            </div>

        </div>
    )
}