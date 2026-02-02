import { getDelayedPurchases } from "@/lib/queries/purchase";
import DelayedPurchasesCard from "./actionCards/DelayedPurchasesCard";

export default async function Delays(){

    const delayedPurchases = await getDelayedPurchases();

    const delays = delayedPurchases.length == 0;
    return (
                <div className={`border-2 p-5 rounded-xl bg-secondary ${delays ? "hidden" : ""}`}>
                          <h1 className="font-semibold text-xl py-3">Delays</h1>
   <div className="grid lg:grid-cols-2 gap-3 mt-5">
    <DelayedPurchasesCard purchases={delayedPurchases} title="Delayed Purchases" description="Stock below reorder point" total={delayedPurchases.length}/>
   </div>
           
                </div>
    )
}