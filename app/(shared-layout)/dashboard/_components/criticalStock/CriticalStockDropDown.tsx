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
            <Link href={'/purchases/new?reorder=' + stockId}><DropdownMenuItem>Purchase Stock</DropdownMenuItem></Link>

            {/* /stock/cmlbsuurl000354uh8tr0qqwn/edit/quantity */}
    
          <DropdownMenuItem>Copy vendor email</DropdownMenuItem>
          {/* <Link href={`/stock/${stockId}/edit/quantity`}><DropdownMenuItem>Update Quantity</DropdownMenuItem></Link> */}
          <Link hidden={!incomingStock} href={'/purchases?status=PLACED'}><DropdownMenuItem>View purchase</DropdownMenuItem></Link>
      
          
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
