"use client";

import { Button } from "@/components/ui/button";
import { markAllReceived } from "@/lib/actions/purchase";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";




export function MarkAllReceivedButton({selectedPurchaseIds}:{selectedPurchaseIds: string[]}) {

    const router = useRouter();

    return (
        <Button variant={"secondary"} className="cursor-pointer hover:bg-primary"

            onClick={() => {
                startTransition(async () => {

           
                    const res = await markAllReceived(selectedPurchaseIds);

                    if (res?.success){
                        toast.success(res.message);
                        router.push('/purchases?status=RECEIVED')
                    }
                    


                    // const res = await markAllComplete(selectedStockIds);

                    // if (res?.success){
                    //     toast.success(res.message);
                    //     router.push('requests?status=COMPLETE')
                    // }
           
            
                    

            

    
                    


           

                })
            }}
        >Mark Received</Button>
    )
}