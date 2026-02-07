import { Suspense } from "react";
import CompletedRequests from "./_components/CompletedRequests";
import TotalSpend from "./_components/TotalSpend";
import MostRequested from "./_components/MostRequested";
import CriticalStock from "./_components/criticalStock/CriticalStock";
import OpenRequests from "./_components/OpenRequests";

import IncomingPurchases from "./_components/IncomingPurchases";
import Inventory from "./_components/Inventory";
import ReadyRequests from "./_components/readyRequests/ReadyRequests";


export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="grid grid-cols-2 gap-6">

                    <CriticalStock/>
                    <OpenRequests/>
                    <ReadyRequests/>
                    <IncomingPurchases/>
                    <Inventory/>
                    <CompletedRequests/>
                    <TotalSpend/>
                    <MostRequested />
                  
               

                </div>

            </Suspense>





        </div>
    )
}