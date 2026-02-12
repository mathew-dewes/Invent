
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"


export function CriticalStockDropDown({stockId, incomingStock}:
    {stockId: string, incomingStock: boolean}
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant="outline">Action</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>

                    <Link hidden={!incomingStock} href={'/purchases?status=PLACED'}><DropdownMenuItem>View recent purchase</DropdownMenuItem></Link>
            <Link  href={'/purchases/new?reorder=' + stockId}><DropdownMenuItem>Create Purchase</DropdownMenuItem></Link>
   
    
  

      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
