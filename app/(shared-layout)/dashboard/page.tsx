import { Suspense } from "react";
import StockHealth from "./_components/StockHealth";

export default function page(){
    
    return (
        <div>

            <Suspense fallback={'Loading Stock health data...'}>
                     <StockHealth/>
            </Suspense>
            


         
       
        </div>
    )
}