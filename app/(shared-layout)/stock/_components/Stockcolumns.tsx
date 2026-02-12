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
import {MoreHorizontal } from "lucide-react"
import { Stock } from "@/lib/types"

import { startTransition } from "react"
import Link from "next/link"
import StockStatusBadge from "@/components/web/badges/StockStatusBadge"


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
      // const itemOrdered = !!row.original.purchases?.find((i) => i.status == "PLACED");
      const reorderPoint = row.original.reorderPoint;
      // const lowStock = quantity >= reorderPoint;
   
      
    return (
          <div className="flex items-center gap-1.5">
             <StockStatusBadge quantity={quantity} reorderPoint={reorderPoint}/>
    
            
          </div>
   
    )

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
              <Link href={`/purchases/new?reorder=${stockId}`}>Purchase stock</Link>
              </DropdownMenuItem> 

            <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>


              <form action={
                (formData: FormData)=>{
                  startTransition(async()=>{
                    console.log(formData);
                   return
                  //  Create delete function\
               
                  
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