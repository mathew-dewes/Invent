import { getLowStock } from "@/lib/queries/stock";
import LowStockCard from "./actionCards/LowStockCard";
import RequestCollectionsCard from "./actionCards/RequestCollectionsCard";

import { getOpenRequests, getReadyRequests } from "@/lib/queries/request";
import HealthBars from "./HealthBars";
import OpenRequestsCard from "./actionCards/OpenRequestsCard";
import PendingRequestCard from "./actionCards/PendingPurchaseCard";
import { getPlacedPurchases } from "@/lib/queries/purchase";

export default async function Action() {

    const [LowStock, readyRequests, openRequests, pendingPurchases] = await Promise.all([getLowStock(), getReadyRequests(), getOpenRequests(), getPlacedPurchases()]);

    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3">Actions</h1>
            <HealthBars />



            <div className="grid lg:grid-cols-2 gap-3 mt-5">
                {LowStock.length > 0 && <LowStockCard title="Low Stock" description="Stock below reorder point" total={LowStock.length} stock={LowStock} />}
                {openRequests.length > 0 && <OpenRequestsCard requests={openRequests} title="Open Requests" description="Stock below reorder point" total={openRequests.length} />}
                {readyRequests.length > 0 && <RequestCollectionsCard requests={readyRequests} title="Requests Ready" description="Stock below reorder point" total={readyRequests.length} />}
                {pendingPurchases.length > 0 && <PendingRequestCard purchases={pendingPurchases} title="Pending Purchase" description="Stock below reorder point" total={pendingPurchases.length} />}
            </div>

        </div>
    )
}