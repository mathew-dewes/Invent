"use client";

import { Button } from "@/components/ui/button";
import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";
import { massUpdatePurchase } from "@/lib/actions/purchase";
import { massUpdateRequests } from "@/lib/actions/request";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";


interface props {
  label: string
  table: "Requests" | "Purchases" 
  status: RequestStatus | PurchaseStatus
  selectedIds: string[],
  selectedStatuses: string[]
  stockIdsAndQuantity?: {id: string | undefined, quantity: number | undefined}[]
}
export function MassUpdateButton({ label, table, status ,selectedIds, selectedStatuses, stockIdsAndQuantity }: props){
     const router = useRouter();

     

    return (
        <Button variant={"secondary"} size={"sm"} className="cursor-pointer hover:bg-primary"
        disabled={selectedIds.length === 0}
        onClick={()=>{
            startTransition(async()=>{
                try {
                    if (table === "Requests"){
                    const res = await massUpdateRequests(selectedIds, status as RequestStatus, selectedStatuses as RequestStatus[]);
                    if (res?.parialUpdate){
                        toast.success("Mass update successful")
                   
                    } else {
                       toast.success("Mass update successful")
                    }
                 
                    router.push(`/requests`);
                    }
                    
                    if (table === "Purchases" && stockIdsAndQuantity){
            
                    await massUpdatePurchase(selectedIds, status as PurchaseStatus, stockIdsAndQuantity);
                      router.push(`/purchases`);
                    toast.success("Success")
                    }

              
                 
                } catch (error) {
            console.error(error)
            toast.error("Failed to update entires")
                }
            })
        }}
        >{label}

        </Button>
    )
}