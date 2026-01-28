import { Suspense } from "react";

import Inventory from "./_components/Inventory";
import Requests from "./_components/Requests";
import Purchases from "./_components/Purchases";

import Budget from "./_components/Budget";

export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="flex flex-col gap-6">
               
                        <Inventory />
                        <Budget/>
                        <Requests />
                        <Purchases/>
            
       
                </div>

            </Suspense>





        </div>
    )
}