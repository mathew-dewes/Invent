"use client";

import { Button } from "@/components/ui/button";
import { markAllReady } from "@/lib/actions/request";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";




export function MarkAllReadyButton({ requestIds }: {requestIds: string[]}) {

    const router = useRouter();

    



    return (
        <Button variant={"secondary"} className="cursor-pointer hover:bg-primary"

            onClick={() => {
                startTransition(async () => {
                        const res = await markAllReady(requestIds);

                        if (!res.success){
                            toast.error(res.message);
                            return;
                        };
                        res.updatedRequests?.forEach(request => {
                            toast.success(request)
                        });
                        
    
                        router.push('/requests?status=READY')
                    
        
       

                })
            }}
        >Confirm Ready</Button>
    )
}