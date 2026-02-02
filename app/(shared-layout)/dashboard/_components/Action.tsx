import { getLowStock } from "@/lib/queries/stock";
import DelayedPurchasesCard from "./actionCards/DelayedPurchasesCard";
import LowStockCard from "./actionCards/LowStockCard";
import RequestCollectionsCard from "./actionCards/RequestCollectionsCard";
import { getDelayedPurchases } from "@/lib/queries/purchase";
import { getReadyRequests } from "@/lib/queries/request";
import HealthBars from "./HealthBars";

export default async function Action(){

    const [LowStock, delayedPurchases, readyRequests] = await Promise.all([getLowStock(), getDelayedPurchases(), getReadyRequests()])
    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
                  <h1 className="font-semibold text-xl py-3">Actions</h1>
                 <HealthBars/>
         


        <div className="grid lg:grid-cols-2 gap-3 mt-5">
            {LowStock.length > 0 && <LowStockCard title="Low Stock" description="Stock below reorder point" total={LowStock.length} stock={LowStock}/>}
   
            {delayedPurchases.length > 0 && <DelayedPurchasesCard purchases={delayedPurchases} title="Delayed Purchases" description="Stock below reorder point" total={delayedPurchases.length}/>}
            {readyRequests.length > 0 && <RequestCollectionsCard requests={readyRequests} title="Request Collections" description="Stock below reorder point" total={readyRequests.length}/>}
                     </div>
   
        </div>
    )
}