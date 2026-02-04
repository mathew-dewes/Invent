import { Suspense } from "react";
import Requests from "./_components/Requests";
import Performance from "./_components/Performance";
import Inventory from "./_components/Inventory";
import Overview from "./_components/Overview";


export default function page() {

    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                <div className="flex flex-col gap-6">
                    <Inventory />
                    <div className="grid grid-cols-1  gap-6">
                        <Requests />
           
                    </div>
                    <Overview/>
    
          <Performance/>
     
          

            






                </div>

            </Suspense>





        </div>
    )
}