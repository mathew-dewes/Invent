"use client";

import { startTransition } from "react";
import { Button } from "../ui/button";
import { cancelRequests } from "@/lib/actions/request";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";
import { StockStatus } from "@/lib/types";
import { returnStock } from "@/lib/queries/stock";



interface Props {
    table: "Requests" | "Purchases"
    selectedIds: string[],
    status: RequestStatus | PurchaseStatus | StockStatus[],
    stockIdsAndQuantity: { id: string | undefined, quantity: number | undefined }[]
}

export default function MassCancelButton({ table, selectedIds, status, stockIdsAndQuantity }: Props
) {

    function buttonText() {
        if (table == "Purchases" && status == "RECEIVED") {
            return "Cancel and return stock"
        
        } else if (table == 'Requests' && status == "COMPLETE"){
            return 'Cancel and restock'
        }
    }


    const router = useRouter();
    return <Button
        onClick={() => {
            startTransition(async () => {
                try {
                    if (table === "Requests" && status !== "COMPLETE") {
                        await cancelRequests(selectedIds);
                        toast("Delete Successful")
                        router.push(`/requests`);
                    } else {
                        await returnStock(stockIdsAndQuantity);
                        await cancelRequests(selectedIds);
                        router.push(`/requests`);
                        toast.info("Inventory was updated");
                      
                    }

                } catch (error) {
                    console.error(error)
                    toast.error("Failed to delete entires");

              
                }

            })
        }}

        variant={"destructive"} size={"sm"} className="cursor-pointer hover:bg-primary">{buttonText()}</Button>
}