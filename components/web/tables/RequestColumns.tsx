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
import { Request } from "@/lib/types"


import { StockStatus } from "@/lib/types"
import StockStatusBadge from "../badges/StockStatusBadge"
import { startTransition } from "react"
import { cancelRequest, changeRequestStatus } from "@/lib/actions/request"
import { toast } from "sonner"
import { adjustInventory } from "@/lib/actions/stock"
import Link from "next/link"


export const Requestcolumns: ColumnDef<Request>[] = [
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
    accessorKey: "requestNumber",

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
    cell: ({ row }) => <StockStatusBadge status={row.getValue("status") as StockStatus} />,
    header: "Status",
  },
  {
    accessorKey: "customer",

    header: "Customer",
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
    accessorKey: "plantNumber",
    header: "Plant",
  },
  {
    accessorKey: "note",
    header: "Notes",
  },




  {
    id: "actions",
    cell: ({ row }) => {

      const requestId = row.original.id;
      const stockId = row.original.stockItem.id;
      // const stockQuantity = row.original.stockItem.quantity;
      const requestQuantity = row.original.quantity;
      // const stockItem = row.original.stockItem.name;
      const requestStatus = row.original.status


      







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


            <DropdownMenuItem className={`${requestStatus =="COMPLETE" ? "hidden" : ""}`} asChild>


              <form action={
                (formData) => {
                  startTransition(async () => {


                    try {

                      const inventory = await adjustInventory(stockId, requestQuantity, requestId);

                      if (inventory?.success) {

                        const result = await changeRequestStatus(formData, 'COMPLETE');


                        if (result?.success) {
                          toast.success(`Request updated`);
                        } else {
                          toast.error("Inventory too low")
                        }

                      } else {

                        toast.error(inventory?.message)

                      }










                    } catch (error) {
                      console.log(error);
                      toast.error("There was error deleting this stock item")

                    }
                  })

                }
              }>
                <input type="hidden" name="requestId" value={requestId} />
                <button type="submit">Mark as Complete</button>
              </form>


            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link className={`${requestStatus =="COMPLETE" ? "hidden" : ""}`} href={`/requests/${requestId}/edit`}><DropdownMenuItem>Edit request</DropdownMenuItem></Link>
  
            <DropdownMenuItem>
                       <form action={
                (formData) => {
                  startTransition(async () => {


                    try {

                      await cancelRequest(formData, requestStatus);










                    } catch (error) {
                      console.log(error);
                      toast.error("There was error deleting this stock item")

                    }
                  })

                }
              }>
                <input type="hidden" name="requestId" value={requestId} />
                <button type="submit">{requestStatus == "COMPLETE" ? "Cancel" : "Delete"} Request</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]