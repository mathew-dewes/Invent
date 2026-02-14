"use client"

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

export function InventoryDropDown({stockId}:
    {stockId: string}
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

            console.log(stockId);
            
                  })

                }
              }>
                <input type="hidden" name="requestId" value={stockId} />
                <button type="submit">Confirm Purchase</button>
              </form>
          </DropdownMenuItem>
          <DropdownMenuItem>
   <Link href={'/purchases/new?reorder=' + stockId}>Create Purchase</Link>
          </DropdownMenuItem>
                 <DropdownMenuItem>
            View Purchase
          </DropdownMenuItem>
          <DropdownMenuItem>
            Copy vendor email
          </DropdownMenuItem>
  

    
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
