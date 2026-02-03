import { Suspense } from "react";
import Requests from "./_components/Requests";
import Purchases from "./_components/Purchases";
import Budget from "./_components/Budget";
import Performance from "./_components/Performance";
import Inventory from "./_components/Inventory";
import Insights from "./_components/insights/Insights";


export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="flex flex-col gap-6">
    

                    <Inventory />
        
                    <div className="grid grid-cols-2  gap-6">
                        <Requests />
                        <Purchases />
                    </div>


                    <Budget />
                    <Performance/>

                 <Insights/>






                </div>

            </Suspense>





        </div>
    )
}