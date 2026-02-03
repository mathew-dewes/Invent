"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Stock } from "@/lib/types"
import StockStatusBadge from "../badges/StockStatusBadge"
import { deleteStock } from "@/lib/actions/stock"
import { startTransition } from "react"
import { toast } from "sonner"
import Link from "next/link"


export const Stockcolumns: ColumnDef<Stock>[] = [
  
      {
    id: "select",
    
  },
  {
    accessorKey: "name",

    header: "Item",
  },
  
  { 

    cell:({row}) => {
      const quantity = row.original.quantity
      const lowStock = row.original.lowStock;
      const itemOrdered = !!row.original.purchases?.find((i) => i.status == "PLACED");
      console.log(itemOrdered);
      

      
      
    return <StockStatusBadge stockOrdered={itemOrdered} lowStock={lowStock} quantity={quantity}/>
    },
    header: "Status",
  },
      {
    accessorKey: "quantity",
      header: () => <div>Quantity</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity")) 
      return <div className="font-medium">{amount}</div>
    },
  },

        {
    accessorKey: "location",
    header: "location",
  },
    {
    accessorKey: "brand",
    header: "Brand",
    
  },
  {
    accessorKey: "vendor.name",
     header: "Vendor",
    
  },
  {
    accessorKey: "reorderPoint",
     header: "Reorder point",
    
  },


    {
    accessorKey: "unitCost",
      header: () => <div>Unit Cost</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("unitCost"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },



  {
    id: "actions",
    cell: ({ row }) => {
      const stockId = row.original.id;

   
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>
              <Link href={`/stock/${stockId}/edit`}>Edit details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/stock/${stockId}/edit/quantity`}>Update quantity</Link>
            </DropdownMenuItem>
  

            <DropdownMenuItem>
              <Link href={`/purchases/new?reorder=${stockId}`}>Reorder</Link>
              </DropdownMenuItem> 

            <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>


              <form action={
                (formData: FormData)=>{
                  startTransition(async()=>{
                    try {
                        await deleteStock(formData);
                        toast.success(`${row.original.name} was deleted`);
                    } catch (error) {
                      console.log(error);
                      toast.error("There was error deleting this stock item")
                      
                    }
                  })
          
                }
                }>
                  <input type="hidden" name="id" value={stockId} />
                  {/* <Button  size={"sm"} variant={"destructive"}>Delete</Button> */}
              <button className="cursor-pointer" type="submit">Delete</button>
              </form>

              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]