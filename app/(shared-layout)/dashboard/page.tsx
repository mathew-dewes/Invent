import { Suspense } from "react";
import Inventory from "./_components/inventory/Inventory";
import ActionBar from "./_components/action/ActionBar";
import CostAnalysis from "./_components/costAnalysis/CostAnalysis";

import WalkThrough from "./_components/walkthrough/WalkThrough";
import StockPerformance from "./_components/StockPerformance/StockPerformance";
import { DashboardSkeleton } from "@/components/web/skeletons/DashboardSkeleton";
import Purchases from "./_components/purchases/Purchases";
import Requests from "./_components/Requests/Requests";


export default function page() {

    return (
        <div>

            <Suspense fallback={<DashboardSkeleton/>}>
                <div className="grid grid-cols-2 gap-6">
       
                    <ActionBar />
                    <Requests/>
                    <Inventory />
                    <Purchases/>
                    <CostAnalysis />
                    <StockPerformance />
                    <WalkThrough />
                </div>

            </Suspense>





        </div>
    )
}