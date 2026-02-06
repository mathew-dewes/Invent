"use client";

import { Button } from "@/components/ui/button";
import { clearData, markAllComplete } from "@/lib/actions/request";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";




export function ClearDataButton({hidden}:{hidden: boolean}) {

    const router = useRouter();

    return (
        <Button hidden={hidden} variant={"destructive"} className="cursor-pointer hover:bg-primary"

            onClick={() => {
                startTransition(async () => {


                     await clearData();

               
           
            
                    

            

    
                    


           

                })
            }}
        >Clear Tables</Button>
    )
}