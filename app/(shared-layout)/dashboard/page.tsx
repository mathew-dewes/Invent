import { Suspense } from "react";
import CompletedRequests from "./_components/completedRequests/CompletedRequests";
import Inventory from "./_components/inventory/Inventory";
import ActionBar from "./_components/action/ActionBar";
import CostAnalysis from "./_components/costAnalysis/CostAnalysis";

import WalkThrough from "./_components/walkthrough/WalkThrough";
import StockPerformance from "./_components/StockPerformance/StockPerformance";
import { DashboardSkeleton } from "@/components/web/skeletons/DashboardSkeleton";


// import Requests from "./_components/requests/Requests";
import Purchases from "./_components/purchases/Purchases";
import RequestOverview from "./_components/RequestOverview/RequestOverview";


export default function page() {

    return (
        <div>

            <Suspense fallback={<DashboardSkeleton/>}>
                <div className="grid grid-cols-2 gap-6">
                    <WalkThrough />
                    <ActionBar />
                    {/* New dashboard components */}
                    {/* Inventory */}
                    {/* Requests - Pending / Ready */}
                    {/* Current Spend */}
                    {/* Highest Spending Cost Centre */}
                    {/* Most requested items */}
                    <RequestOverview/>
                    {/* <Requests/> */}
                    <Inventory />
                    <Purchases/>
                    <CostAnalysis />
                    <StockPerformance />
                    <CompletedRequests />
              
       


              
             




                </div>

            </Suspense>





        </div>
    )
}