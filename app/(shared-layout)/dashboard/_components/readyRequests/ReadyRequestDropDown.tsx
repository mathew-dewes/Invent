"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MarkComplete } from "@/lib/actions/request"
import Link from "next/link"
import { startTransition } from "react"
import { toast } from "sonner"

export function ReadyRequestDropDown({requestId}:
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

                    const res = await MarkComplete(requestId);

                    if (res.success){
                      toast.success(res.message);
                    } else {
                      toast.error(res.message)
                    }
                  })

                }
              }>
                <input type="hidden" name="requestId" value={requestId} />
                <button type="submit">Mark as Complete</button>
              </form>
          </DropdownMenuItem>
          <Link href={`/requests/${requestId}/edit`}><DropdownMenuItem>Update request</DropdownMenuItem></Link>
          <Link  href={'/purchases?status=PLACED'}><DropdownMenuItem>Cancel request</DropdownMenuItem></Link>
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
