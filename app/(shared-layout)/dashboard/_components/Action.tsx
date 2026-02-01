import { getOpenRequests, getReadyRequests } from "@/lib/queries/request";
import OpenRequestsCard from "./actionCards/OpenRequestsCard";
import ReadyRequestsCard from "./actionCards/ReadyRequestsCard";
import DelayedPurchasesCard from "./actionCards/DeplayPurchasesCard";
import { getDelayedPurchases } from "@/lib/queries/purchase";
import LowStockCard from "./actionCards/LowStockCard";

export default async function Action(){

    const [openRequests, readyRequests, delayedPurchases] = await Promise.all([getOpenRequests(), getReadyRequests(), getDelayedPurchases()]);


    const noEntries = openRequests.length == 0 && readyRequests.length ==0 && delayedPurchases.length == 0;
    
    
    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary ${noEntries ? "hidden" : ""}`}>
                  <h1 className="font-semibold text-xl py-3">Actions</h1>

        <div className="grid lg:grid-cols-3 gap-3">
            <LowStockCard title="Low Stock" description="Stock below reorder point" total={2}/>
         {openRequests.length > 0 && <OpenRequestsCard details={openRequests} title="Open requests" description="Requests awaiting to be picked" total={openRequests.length}/>}
         {readyRequests.length > 0 && <ReadyRequestsCard details={readyRequests} title="Ready requests" description="Requests ready for collection" total={readyRequests.length}/>}
         {delayedPurchases.length > 0 && <DelayedPurchasesCard details={delayedPurchases} title="Delayed purchases" description="Stock items waiting for delivery" total={2}/>}
                  </div>
   
        </div>
    )
}