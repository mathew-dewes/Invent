import { getPuchaseCardData, getPurchaseChartData } from "@/lib/queries/purchase";
import { PurchaseChart } from "./charts/PurchaseChart";
import PurchaseCard from "./PurchaseCard";


export default async function Purchases() {

    const [purchases, chartData] = await Promise.all([getPuchaseCardData(), getPurchaseChartData()])


    const urgentPurchaseCount = purchases.filter((i => i.status !== "RECEIVED")).length
    const receivedPurchases = purchases.filter((i => i.status === "RECEIVED"));
    const placedPurchases = purchases.filter((i => i.status === "PLACED"));
    const delayedPurchases = purchases.filter((i => i.status === "DELAYED"));


    return (
        <div className="border-2 p-3 rounded-xl bg-secondary">
            <h1 className="font-semibold text-xl py-3 ml-1">Purchases</h1>
            <div className="grid grid-cols-6 gap-3">
                <div className="col-span-2">
                    <PurchaseChart chartData={chartData} activeRequestCount={urgentPurchaseCount} />
                </div>

                <div className="col-span-4 flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-3">
                        <PurchaseCard title="Delayed" status="DELAYED" purchases={delayedPurchases} total={delayedPurchases.length} />
                        <PurchaseCard title="Placed" status="PLACED" purchases={placedPurchases} total={placedPurchases.length} />
                        <div className="col-span-2 w-full">
                        <PurchaseCard title="Received" status="RECEIVED" purchases={receivedPurchases} total={receivedPurchases.length} />
                        </div>
                   


                    </div>




                </div>








            </div>

        </div>
    )
}