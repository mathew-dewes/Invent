"use client";

import { Button } from "@/components/ui/button";
import { markRequestsReady } from "@/lib/actions/request";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";


type Props = {
    stockIdsAndQuantity: {
        id: string | undefined,
        quantity: number
    }[],
    selectedIds: string[]
}



export function MarkAllReadyButton({ stockIdsAndQuantity }: Props) {

    const router = useRouter();



    return (
        <Button variant={"secondary"} className="cursor-pointer hover:bg-primary"

            onClick={() => {
                startTransition(async () => {
                    
                    
                    const res = await markRequestsReady(stockIdsAndQuantity);
                    if (res.success){
                        toast.success(res.message);
                        router.push('/requests?status=READY')
                     
                    } else {
                        toast.warning(res.message)
                    }
       

                })
            }}
        >Mark Ready</Button>
    )
}