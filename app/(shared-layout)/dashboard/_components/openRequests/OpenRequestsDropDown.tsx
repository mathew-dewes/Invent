"use client";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { markReady } from "@/lib/actions/request"
import Link from "next/link"
import { startTransition } from "react"
import { toast } from "sonner"

export function OpenRequestsDropDown({requestId}:
    {requestId: string}
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant="outline">Action</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
            <DropdownMenuItem>
                          <form action={
                () => {
                  startTransition(async () => {

                    const res = await markReady(requestId);

                    if (res?.success){
                      toast.success(res.message)
                    } else {
                      toast.error(res?.message)
                    }

              
                  })

                }
              }>
          
                <button type="submit">Mark Ready</button>
              </form>
            </DropdownMenuItem>
     

          <Link  href={'/purchases?status=PLACED'}><DropdownMenuItem>Update Request</DropdownMenuItem></Link>
          <Link  href={'/purchases?status=PLACED'}><DropdownMenuItem>Cancel Request</DropdownMenuItem></Link>
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
