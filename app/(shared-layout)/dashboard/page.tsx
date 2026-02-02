import { Suspense } from "react";

import Requests from "./_components/Requests";
import Purchases from "./_components/Purchases";

import Budget from "./_components/Budget";
import Action from "./_components/Action";
import RequestInsight from "./_components/RequestInsight";

export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="flex flex-col gap-6">

                    <Action />
                    <div>
                
                        <Budget />
                    </div>
                        <Requests />
                        <Purchases />
                    
            
                    <RequestInsight/>






                </div>

            </Suspense>





        </div>
    )
}