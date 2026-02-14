import { Suspense } from "react";
import CompletedRequests from "./_components/completedRequests/CompletedRequests";
import Inventory from "./_components/inventory/Inventory";
import ActionBar from "./_components/action/ActionBar";
import CostAnalysis from "./_components/costAnalysis/CostAnalysis";

import WalkThrough from "./_components/walkthrough/WalkThrough";
import StockPerformance from "./_components/StockPerformance/StockPerformance";
import { DashboardSkeleton } from "@/components/web/skeletons/DashboardSkeleton";
import PurchaseSummary from "./_components/PurchaseSummary/PurchaseSummary";

import Requests from "./_components/requests/Requests";


export default function page() {

    return (
        <div>

            <Suspense fallback={<DashboardSkeleton/>}>
                <div className="grid grid-cols-2 gap-6">
                    <WalkThrough />
                    <ActionBar />
                    {/* New dashboard components */}
                    {/* Iventory */}
                    {/* Requests - Pending / Ready */}
                    {/* Current Spend */}
                    {/* Highest Spending Cost Centre */}
                    {/* Most requested items */}
                    <Inventory />
                    <Requests/>
            
              
                    <PurchaseSummary />
                    <CostAnalysis />

                    <CompletedRequests />


                    <StockPerformance />
             




                </div>

            </Suspense>





        </div>
    )
}