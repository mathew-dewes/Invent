import { Suspense } from "react";
import CriticalStock from "./_components/criticalStock/CriticalStock";
import ReadyRequests from "./_components/readyRequests/ReadyRequests";
import OpenRequests from "./_components/openRequests/OpenRequests";
import CompletedRequests from "./_components/completedRequests/CompletedRequests";
import IncomingPurchases from "./_components/incomingPurchases/IncomingPurchases";
import Inventory from "./_components/inventory/Inventory";
import ActionBar from "./_components/action/ActionBar";
import CostAnalysis from "./_components/costAnalysis/CostAnalysis";

import WalkThrough from "./_components/walkthrough/WalkThrough";
import StockPerformance from "./_components/StockPerformance/StockPerformance";
import { DashboardSkeleton } from "@/components/web/skeletons/DashboardSkeleton";
import PurchaseSummary from "./_components/PurchaseSummary/PurchaseSummary";


export default function page() {

    return (
        <div>

            <Suspense fallback={<DashboardSkeleton/>}>
                <div className="grid grid-cols-2 gap-6">
                    <WalkThrough />
                    <ActionBar />
                          <Inventory />
                  
                    <CriticalStock />
                    <ReadyRequests />
                    <OpenRequests />
                    <IncomingPurchases />
              
                    <PurchaseSummary />
                    <CostAnalysis />

                    <CompletedRequests />


                    <StockPerformance />
             




                </div>

            </Suspense>





        </div>
    )
}