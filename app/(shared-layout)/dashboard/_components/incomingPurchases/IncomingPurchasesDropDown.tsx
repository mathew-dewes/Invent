"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { markReceived } from "@/lib/actions/purchase"
import { startTransition } from "react"
import { toast } from "sonner"


export function IncomingPurchasesDropDown({purchaseId}:
    {purchaseId: string}
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant="outline">Action</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
              <DropdownMenuItem asChild>
          
          
                        <form action={
                          () => {
                            startTransition(async () => {
          
                              try {
          
                                const res = await markReceived(purchaseId);
          
                                if (!res?.success) {
                                  toast.error(res?.message)
                                } else {
                                  toast.success(res.message);
                                }
          
          
          
                              } catch (error) {
                                console.log(error);
          
                              }
          
          
          
          
          
                            })
                          }
                        }>
                          <input type="hidden" name="purchaseId" value={purchaseId} />
            
                          <button type="submit">Mark Received</button>
                        </form>
          
          
                      </DropdownMenuItem>
          <DropdownMenuItem>Copy vendor email</DropdownMenuItem>


      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
