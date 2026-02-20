"use client";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RequestStatus } from "@/generated/prisma/enums";
import { cancelAndReturnRequest, cancelRequest, MarkComplete, markReady } from "@/lib/actions/request";

import Link from "next/link"
import { startTransition } from "react"
import { toast } from "sonner"

export function RequestActionDropdown({requestId, status}:
    {requestId: string, status: RequestStatus}
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant="outline">Action</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
            <DropdownMenuItem hidden={status == "READY"}>
                          <form action={
                () => {
                  startTransition(async () => {

                      const res = await markReady(requestId);

                    if (res.success){
                      toast.success(res.message)
                    } else {
                      toast.error(res.message)
                    }

           

              
                  })

                }
              }>
          
                <button type="submit">Confirm Ready</button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem hidden={status != "READY"}>
                          <form action={
                () => {
                  startTransition(async () => {


                    const res = await MarkComplete(requestId);

                    if (res.success){
                      toast.success(res.message)
                    } else {
                      toast.error(res.message)
                    }

           

              
                  })

                }
              }>
          
                <button type="submit">Complete</button>
              </form>
            </DropdownMenuItem>
     

          <Link hidden={status !== "PENDING"}  href={`/requests/${requestId}/edit`}><DropdownMenuItem>Update details</DropdownMenuItem></Link>
           <DropdownMenuItem>
                        <form action={
                          () => {
                            startTransition(async () => {
          
                              if (status !== "PENDING") {
          
                                const res = await cancelAndReturnRequest(requestId);
                                if (res.success) {
                                  toast.success(res.message);
                   
                                }
                              } else {
                                const res = await cancelRequest(requestId);
                                if (res.success) {
                                  toast.success(res.message)
                                }
          
                              }
                            })
          
                          }
                        }>
                          <input type="hidden" name="requestId" value={requestId} />
                          <button type="submit">{status !== "PENDING" ? "Cancel and return" : "Cancel request"}</button>
                        </form>
                      </DropdownMenuItem>
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
