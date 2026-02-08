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
            <Link hidden={incomingStock} href={'/purchases/new?reorder=' + stockId}><DropdownMenuItem>Purchase Stock</DropdownMenuItem></Link>
    
  
          <Link hidden={!incomingStock} href={'/purchases?status=PLACED'}><DropdownMenuItem>View purchase</DropdownMenuItem></Link>
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
