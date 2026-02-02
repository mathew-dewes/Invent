import { getPurchaseChartData, getPurchaseTableData } from "@/lib/queries/purchase";
import { PurchaseChart } from "./charts/PurchaseChart";


import PurchaseTable from "./tables/PurchaseTable";


export default async function Purchases() {

    const [chartData, tableData] = await Promise.all([getPurchaseChartData(), getPurchaseTableData()]);




    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>

            <h1 className="font-semibold text-xl py-3 ml-2">Purchases</h1>

            <div className="grid grid-cols-1 gap-5">
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