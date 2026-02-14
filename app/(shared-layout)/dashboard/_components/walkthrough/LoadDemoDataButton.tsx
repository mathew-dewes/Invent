"use client"

import { Button } from "@/components/ui/button";
import { LoadDemoData } from "@/lib/actions/populate";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoadDemoDataButton(){
        const [isPending, startTransition] = useTransition()

    return <Button disabled={isPending}  className="cursor-pointer hover:bg-primary" onClick={()=>{
        startTransition(async()=>{
            const res = await LoadDemoData();
            if (res.success){
                toast.success(res.message);
                toast.success("10 x Stock items were added");
                toast.success("10 x Vendors were added");
                toast.success("10 x Cost Centres were added");
                toast.success("100 x Requests were added");
                toast.success("50 x Purchases were added");

            } else {
                toast.error(res.message)
            }
        })
    }} > {isPending ? (
                                <>
                                <Loader2 className="size-4 animate-spin"/>
                                <span>Populating...</span>
                                </>
                            ): (<span>Load demo data</span>)}</Button>
}

