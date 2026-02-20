"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { confirmPurchase } from "@/lib/actions/purchase"

import Link from "next/link"
import { startTransition } from "react"
import { toast } from "sonner"

export function InventoryDropDown({stockId, incomingPurchase, vendorEmail}:
    {stockId: string, incomingPurchase: boolean, vendorEmail: string}
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant="outline">Action</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem hidden={!incomingPurchase}>
    <form action={
                () => {
                  startTransition(async () => {
            const res = await confirmPurchase(stockId);

            if (res.success){
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
            
                  })

                }
              }>
                <input type="hidden" name="requestId" value={stockId} />
                <button type="submit">Confirm Purchase</button>
              </form>
          </DropdownMenuItem>
          <DropdownMenuItem hidden={incomingPurchase}>
   <Link href={'/purchases/new?reorder=' + stockId}>Create Purchase</Link>
          </DropdownMenuItem>
                 <DropdownMenuItem hidden={!incomingPurchase}>
            View Purchase
          </DropdownMenuItem>
              <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(vendorEmail);
              toast.success('Email copied to clipboard')
              }}
            >Copy vendor email
            </DropdownMenuItem>

  

    
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
