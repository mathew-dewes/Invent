import { Suspense } from "react";
import Requests from "./_components/Requests";
import Purchases from "./_components/Purchases";
import Budget from "./_components/Budget";
import Action from "./_components/Action";
import Performance from "./_components/Performance";

import Delays from "./_components/Delays";

export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="flex flex-col gap-6">

                    <Action />
                    <Delays />
                    {/* <div className="grid lg:grid-cols-2 gap-6">
                        <Requests />
                        <Purchases />
                    </div> */}


                    <Budget />
                    <Performance/>






                </div>

            </Suspense>





        </div>
    )
}