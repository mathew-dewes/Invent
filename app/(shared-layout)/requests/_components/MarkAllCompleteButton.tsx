"use client";

import { Button } from "@/components/ui/button";
import { markAllComplete } from "@/lib/actions/request";
import { convertToMoney } from "@/lib/helpers";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";




export function MarkAllCompleteButton({selectedStockIds}:{selectedStockIds: string[]}) {

    const router = useRouter();

    return (
        <Button variant={"secondary"} className="cursor-pointer hover:bg-primary"

            onClick={() => {
                startTransition(async () => {


                    const res = await markAllComplete(selectedStockIds);

                    if (res?.success){
                        res.requests.forEach(request => {
                            toast.success("Request #" + request.requestNumber + " completed");
                            toast.success(request.stockItem + " x " + request.requestQuantity + " issued to " + request.customer );
                            toast.info(request.costCentre + " was charged " + convertToMoney(request.chargeCost))
                        });
                
                        router.push('requests?status=COMPLETE')
                    }
           
            
                    

            

    
                    


           

                })
            }}
        >Complete</Button>
    )
}