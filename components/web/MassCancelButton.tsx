"use client";

import { startTransition } from "react";
import { Button } from "../ui/button";
import { cancelRequests } from "@/lib/actions/request";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



interface Props {
      table: "Requests" | "Purchases" 
      selectedIds: string[]
}

export default function MassCancelButton({table, selectedIds}: Props
){

const router = useRouter();
    return  <Button
    onClick={()=>{
        startTransition(async()=>{
try {
    if (table === "Requests"){
        await cancelRequests(selectedIds);
        toast("Delete Successful")
        router.push(`/requests`);
    }
    
} catch (error) {
       console.error(error)
            toast.error("Failed to delete entires")
                }
        
        })
    }}
    
    variant={"destructive"} size={"sm"} className="cursor-pointer hover:bg-primary">CANCEL</Button>
}