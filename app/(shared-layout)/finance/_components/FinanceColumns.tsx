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


import { Finance } from "@/lib/types"

import { startTransition } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"


const HideCheckboxes = () =>{
  const searchParams = useSearchParams().get('status');

  if (searchParams == "RECEIVED" || !searchParams){
    return true
  } else{

    return false
  }

}


export const Financecolumns: ColumnDef<Finance>[] = [
      {
    id: "select",
    header: ({ table }) => (
      <Checkbox
           hidden={HideCheckboxes()}
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
           hidden={HideCheckboxes()}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    
  },
    {
    accessorKey: "createdAt",

    header: "Date",
            cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleString("en-NZ", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    
      });
  },
  },
    {
    accessorKey: "sourceType",
    cell:({row}) => 
      <Badge variant={"secondary"}>{row.getValue("sourceType")}</Badge>,
    header: "Type",
  },
     {
    accessorKey: "reference",

    header: "Reference",
  },
    {
    accessorKey: "stockName",
    header: "Stock Item",
  },
      {
    accessorKey: "vendorName",

    header: "Vendor",
    cell:({row})=>{
      return row.getValue('vendorName') ?? '-'
    }
  },





      {
    accessorKey: "quantity",
      header: () => <div>QTY</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity")) 
      return <div className="font-medium">{amount}</div>
    },
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
    accessorKey: "totalCost",
      header: () => <div>Total Cost</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalCost"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
     {
    accessorKey: "costCentre",
    header: "Cost Centre",
    cell:({row})=>{
      return <p className="uppercase">{row.getValue('costCentre')}</p>
    }
  },




  {
    id: "actions",
    cell: ({ row }) => {

      const purchaseId = row.original.id;
      const purchaseQuantity = row.original.quantity;


      

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
            <DropdownMenuItem asChild>


              <form action={
                () => {
                  startTransition(async () => {

              return

            
                    
                  

                })}
              }>
                <input type="hidden" name="purchaseId" value={purchaseId} />
                <input type="hidden" name="purchaseQuantity" value={purchaseQuantity} />
                <button type="submit">Mark Received</button>
              </form>


            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/purchases/${purchaseId}/edit`}><DropdownMenuItem>Edit Purchase</DropdownMenuItem></Link>

            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]