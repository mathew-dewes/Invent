import { Suspense } from "react";
import CriticalStock from "./_components/criticalStock/CriticalStock";
import ReadyRequests from "./_components/readyRequests/ReadyRequests";
import OpenRequests from "./_components/openRequests/OpenRequests";
import CompletedRequests from "./_components/completedRequests/CompletedRequests";
import IncomingPurchases from "./_components/incomingPurchases/IncomingPurchases";
import Inventory from "./_components/inventory/Inventory";
import MostRequested from "./_components/mostRequested/MostRequested";
import TotalSpend from "./_components/totalSpend/TotalSpend";
import ActionBar from "./_components/action/ActionBar";
import CostAnalysis from "./_components/costAnalysis/CostAnalysis";
import StockForcast from "./_components/stockForcast/StockForcast";


export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="grid  grid-cols-2 gap-6">
                    <ActionBar />
                    <ReadyRequests />
                    <OpenRequests />
                    <IncomingPurchases />
                    <CriticalStock />
                    <Inventory />
                    <CompletedRequests />
                    <CostAnalysis />
                    <TotalSpend />
                    <MostRequested />
                    <StockForcast />




                </div>

            </Suspense>





        </div>
    )
}