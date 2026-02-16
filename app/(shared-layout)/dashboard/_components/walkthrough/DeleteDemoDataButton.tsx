"use client"

import { Button } from "@/components/ui/button";
import { clearDemoData } from "@/lib/actions/populate";
import { useTransition } from "react";

import { toast } from "sonner";

export default function DeleteDemoDataButton(){
    const [isPending, startTransition] = useTransition()

    return <Button  className="cursor-pointer hover:bg-primary" onClick={()=>{
        startTransition(async()=>{
            const res = await clearDemoData();
            if (res.success){
                toast.success(res.message);
             
            } else {
                toast.error(res.message)
            }
        })
    }} >{isPending ? "Deleting" : "Delete Data"}</Button>
}