"use client"

import { Button } from "@/components/ui/button";
import { LoadDemoData } from "@/lib/actions/populate";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

export default function LoadDemoDataButton(){

    const router = useRouter();
    return <Button  className="cursor-pointer hover:bg-primary" onClick={()=>{
        startTransition(async()=>{
            const res = await LoadDemoData();
            if (res.success){
                toast.success(res.message);
                router.push('/vendors')
            } else {
                toast.error(res.message)
            }
        })
    }} >Load Data</Button>
}