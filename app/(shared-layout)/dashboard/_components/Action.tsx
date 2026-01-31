import { getOpenRequests, getReadyRequests } from "@/lib/queries/request";
import OpenRequestsCard from "./actionCards/OpenRequestsCard";
import ReadyRequestsCard from "./actionCards/ReadyRequestsCard";
import DelayedPurchasesCard from "./actionCards/DeplayPurchasesCard";
import { getDelayedPurchases } from "@/lib/queries/purchase";

export default async function Action(){

    const [openRequests, readyRequests, delayedPurchases] = await Promise.all([getOpenRequests(), getReadyRequests(), getDelayedPurchases()])
    
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary">
                  <h1 className="font-semibold text-xl py-3">Urgent action</h1>

                  <div className="grid lg:grid-cols-3 gap-3">
         <OpenRequestsCard details={openRequests} title="Open requests" description="Requests awaiting to be picked" total={openRequests.length}/>
         <ReadyRequestsCard details={readyRequests} title="Ready requests" description="Requests ready for collection" total={readyRequests.length}/>
         <DelayedPurchasesCard details={delayedPurchases} title="Delayed purchases" description="Stock items waiting for delivery" total={2}/>
                  </div>
   
        </div>
    )
}