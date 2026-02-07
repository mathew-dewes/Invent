import { Suspense } from "react";
import CompletedRequests from "./_components/CompletedRequests";
import TotalSpend from "./_components/TotalSpend";
import MostRequested from "./_components/MostRequested";
import CriticalStock from "./_components/CriticalStock";
import OpenRequests from "./_components/OpenRequests";
import ReadyRequests from "./_components/ReadyRequests";
import IncomingPurchases from "./_components/IncomingPurchases";
import Inventory from "./_components/Inventory";


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