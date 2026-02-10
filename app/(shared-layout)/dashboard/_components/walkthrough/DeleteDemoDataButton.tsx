"use client"

import { Button } from "@/components/ui/button";
import { clearDemoData } from "@/lib/actions/populate";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";

export default function DeleteDemoDataButton(){
    const [isPending, startTransition] = useTransition()

    const router = useRouter();
    return <Button  className="cursor-pointer hover:bg-primary" onClick={()=>{
        startTransition(async()=>{
            const res = await clearDemoData();
            if (res.success){
                toast.success(res.message);
                router.push('/vendors')
            } else {
                toast.error(res.message)
            }
        })
    }} >{isPending ? "Deleting" : "Delete Data"}</Button>
}