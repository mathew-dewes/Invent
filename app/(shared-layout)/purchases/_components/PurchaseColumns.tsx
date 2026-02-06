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
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Purchase } from "@/lib/types"
import { startTransition } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import PurchaseStatusBadge from "@/components/web/badges/PurchaseStatusBadge"
import { markReceived } from "@/lib/actions/purchase"


const HideCheckboxes = () =>{
  const searchParams = useSearchParams().get('status');

  if (searchParams == "RECEIVED" || !searchParams){
    return true
  } else{

    return false
  }

}


export const Purchasecolumns: ColumnDef<Purchase>[] = [
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
    accessorKey: "purchaseNumber",

    header: "ID",
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
    accessorKey: "status",
    cell:({row}) => <PurchaseStatusBadge status={row.original.status} createdAt={row.original.createdAt}/>,
    header: "Status",
  },
   {
    accessorKey: "stockItem.name",
    header: "Item",
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
    accessorKey: "stockItem.vendor.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      

      const vendor = row.original.stockItem.vendor.name
      return vendor
    }
    
  },

    {
    accessorKey: "PO",

    header: "PO#",
  },


   {
    accessorKey: "totalCost",
      header: () => <div>Cost</div>,
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

                    try {

                 const res = await markReceived(purchaseId);

                 if (!res?.success){
                  toast.error(res?.message)
                 } else {
                  toast.success(res.message);
                 }

            
              
                    } catch (error) {
                      console.log(error);
                      
                    }

            
                    
                  

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