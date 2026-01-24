"use client";

import { Button } from "@/components/ui/button";
import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";
import { massUpdatePurchase } from "@/lib/actions/purchase";
import { massUpdateRequests } from "@/lib/actions/request";
import { checkInventory } from "@/lib/actions/stock";
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
export function MassUpdateButton({ label, table, status ,selectedIds, stockIdsAndQuantity }: props){
     const router = useRouter();

     

    return (
        <Button variant={"secondary"} size={"sm"} className="cursor-pointer hover:bg-primary"
        disabled={selectedIds.length === 0}
        onClick={()=>{
            startTransition(async()=>{

                if (!stockIdsAndQuantity) return;
                
                try {
                    if (table === "Requests"){

                    const inventoryCheck = await checkInventory(stockIdsAndQuantity);
                           console.log(inventoryCheck);
                    
                    
                if (inventoryCheck.ok || status == "COMPLETE"){

                    await massUpdateRequests(selectedIds, status as RequestStatus, stockIdsAndQuantity);
                router.push(`/requests?status=${status}`);
                    } 
                    
                    else{
                         toast.info("Stock level is insufficient")
                        inventoryCheck.insufficient!.map((error)=>{
                        toast.info(error.name + " = " + error.available + " units available")
                        })
                  
                    }
                 
           
                 
 
                    }
                    
                    if (table === "Purchases"){
            
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