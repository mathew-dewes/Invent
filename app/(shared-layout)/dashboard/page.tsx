import { Suspense } from "react";

import Inventory from "./_components/Inventory";
import Requests from "./_components/Requests";
import Purchases from "./_components/Purchases";

import Budget from "./_components/Budget";
import Action from "./_components/Action";

export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="flex flex-col gap-6">

              <Action/>
                    <div className="grid lg:grid-cols-2  gap-5">
                        <Inventory />
                        <Budget />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-5">
                        <Requests />
                        <Purchases />
                    </div>




                </div>

            </Suspense>





        </div>
    )
}