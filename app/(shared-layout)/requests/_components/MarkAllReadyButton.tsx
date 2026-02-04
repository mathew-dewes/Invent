"use client";

import { Button } from "@/components/ui/button";
import { markAllReady } from "@/lib/actions/request";
import { checkInventoryBatch } from "@/lib/actions/stock";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";


type Props = {
    stockIdsAndQuantity: {
        id: string,
        quantity: number
    }[],

}



export function MarkAllReadyButton({ stockIdsAndQuantity }: Props) {

    const router = useRouter();

    



    return (
        <Button variant={"secondary"} className="cursor-pointer hover:bg-primary"

            onClick={() => {
                startTransition(async () => {

                    
              

                    const inventoryCheck = await checkInventoryBatch(stockIdsAndQuantity);

                    if (inventoryCheck.canFulfillAll){

                         await markAllReady(stockIdsAndQuantity)
            
                        inventoryCheck.results.forEach(stock => {
                            toast.success(stock.itemName + " stock updated");
                            if (stock.isLow){
                                toast.warning("Low stock: " + stock.itemName + " SOH: " + stock.availableQty)
                            }
                        });
                        router.push('/requests?status=READY')

                    } else {
                        
                        inventoryCheck.results.forEach(stock => {
                            if (stock.availableQty <= stock.requestedQty){
                                toast.warning(stock.itemName + ": SOH " + stock.availableQty)
                            }
              
                  
                            
                        });
                        toast.info('Inventory insufficient')
                    }

    
                    

                  
                    

                    return
           
                     await markAllReady(stockIdsAndQuantity);
                    // if (res.success){
                    //     toast.success(res.message);
                    //     router.push('/requests?status=READY')
                     
                    // } else {
                    //     toast.warning(res.message)
                    // }
       

                })
            }}
        >Mark Ready</Button>
    )
}