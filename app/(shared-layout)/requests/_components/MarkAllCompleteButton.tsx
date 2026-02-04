"use client";

import { Button } from "@/components/ui/button";
import { markAllComplete } from "@/lib/actions/request";

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
                        toast.success(res.message);
                        router.push('requests?status=COMPLETE')
                    }
           
            
                    

            

    
                    


           

                })
            }}
        >Mark Complete</Button>
    )
}