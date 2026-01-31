import { getPuchaseCardData, getPurchaseChartData } from "@/lib/queries/purchase";
import { PurchaseChart } from "./charts/PurchaseChart";
import PurchaseCard from "./PurchaseCard";


export default async function Purchases() {

    const [purchases, chartData] = await Promise.all([getPuchaseCardData(), getPurchaseChartData()]);

console.log(chartData);

    


    const placedPurchases = purchases.filter((i => i.status === "PLACED"));
    const delayedPurchases = purchases.filter((i => i.status === "DELAYED"));

    const noEntires = placedPurchases.length == 0 && delayedPurchases.length == 0;


    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary flex-1 ${noEntires ? "hidden" : ""}`}>
            <div className="grid grid-cols-2 gap-3">
     <h1 className="font-semibold text-xl py-3">Purchases</h1>
     <h1 className="font-semibold text-xl py-3">Queries</h1>
            </div>
       
            <div className="grid grid-cols-10 gap-3">
                <div className="col-span-6">
                    <PurchaseChart data={chartData} />
                </div>

                <div className="flex flex-col gap-3 col-span-4 relative">
        
                        {delayedPurchases.length > 0 && <PurchaseCard title="Delayed" status="DELAYED" purchases={delayedPurchases} total={delayedPurchases.length} />}
                        {placedPurchases.length > 0 && <PurchaseCard title="Placed" status="PLACED" purchases={placedPurchases} total={placedPurchases.length} />}
                 
                   


                   




                </div>








            </div>

        </div>
    )
}