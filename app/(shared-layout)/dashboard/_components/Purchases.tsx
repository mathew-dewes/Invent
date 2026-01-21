import { getPuchaseCardData, getPurchaseChartData } from "@/lib/queries/purchase";
import { PurchaseChart } from "./charts/PurchaseChart";
import PurchaseCard from "./PurchaseCard";


export default async function Purchases() {

    const purchases = await getPuchaseCardData();
    const chartData = await getPurchaseChartData();


    console.log(chartData);



    const urgentPurchaseCount = purchases.filter((i => i.status !== "RECEIVED")).length
    const receivedPurchases = purchases.filter((i => i.status === "RECEIVED"));
    const placedPurchases = purchases.filter((i => i.status === "PLACED"));
    const delayedPurchases = purchases.filter((i => i.status === "DELAYED"));


    return (
        <div className="border-2 p-3 rounded-xl bg-secondary">
            <h1 className="font-semibold text-xl py-3 ml-1">Purchases</h1>
            <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2">
                    <PurchaseChart chartData={chartData} activeRequestCount={urgentPurchaseCount} />
                </div>

                <div className="col-span-2 flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-3">
                        {delayedPurchases.length > 0 && <PurchaseCard title="Delayed" status="DELAYED" purchases={delayedPurchases} total={delayedPurchases.length} />}
                        {placedPurchases.length > 0 && <PurchaseCard title="Placed" status="PLACED" purchases={placedPurchases} total={placedPurchases.length} />}
                        {receivedPurchases.length > 0 && <PurchaseCard title="Received" status="RECEIVED" purchases={receivedPurchases} total={receivedPurchases.length} />}


                    </div>




                </div>








            </div>

        </div>
    )
}