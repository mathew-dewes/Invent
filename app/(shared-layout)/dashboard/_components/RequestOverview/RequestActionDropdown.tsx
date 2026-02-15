"use client";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { startTransition } from "react"
import { toast } from "sonner"

export function RequestActionDropdown({requestId}:
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

                    toast.success(requestId)

           

              
                  })

                }
              }>
          
                <button type="submit">Mark Ready</button>
              </form>
            </DropdownMenuItem>
     

          <Link  href={`/requests/${requestId}/edit`}><DropdownMenuItem>Update details</DropdownMenuItem></Link>
          <Link  href={`/purchases?status=PLACED`}><DropdownMenuItem>Cancel Request</DropdownMenuItem></Link>
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
