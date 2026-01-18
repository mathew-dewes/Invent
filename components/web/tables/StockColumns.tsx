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
import { Checkbox } from "@/components/ui/checkbox"


import { Stock, StockStatus } from "@/lib/types"
import StockStatusBadge from "../badges/StockStatusBadge"
import { generateStockStatus } from "@/lib/helpers"
import { deleteStock } from "@/lib/actions/stock"
import { startTransition } from "react"
import { toast } from "sonner"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const Stockcolumns: ColumnDef<Stock>[] = [
      {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",

    header: "Item",
  },
  { 

    cell:({row}) => {
      const quantity = row.getValue("quantity") as number;
      const reorderAmount = row.getValue("reorderPoint") as number;
      
    return <StockStatusBadge status={generateStockStatus(quantity, reorderAmount)  as StockStatus}/>
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
    accessorKey: "maxStock",
     header: "Max QTY",
    
  },
  {
    accessorKey: "reorderPoint",
     header: "Reorder QTY",
    
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
            <Link href={`/stock/${stockId}/edit`}><DropdownMenuItem>Edit Stock</DropdownMenuItem></Link>
                      
            <DropdownMenuItem asChild>


              <form action={
                (formData)=>{
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
              <button type="submit">Delete stock</button>
              </form>

              
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copy vendor email</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]