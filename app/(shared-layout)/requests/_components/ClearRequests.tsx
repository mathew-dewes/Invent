"use client";

import { Button } from "@/components/ui/button";
import { clearData } from "@/lib/actions/request";


import { startTransition } from "react";
import { toast } from "sonner";




export function ClearDataButton({hidden}:{hidden: boolean}) {

    return (
        <Button hidden={hidden} variant={"outline"} className="cursor-pointer"

            onClick={() => {
                startTransition(async () => {


                    const res = await clearData();

                    if (res.success){
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }

               
           
            
                    

            

    
                    


           

                })
            }}
        >Clear Tables</Button>
    )
}