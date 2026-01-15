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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



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

    header: "#",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
        cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleString("en-NZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  },
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
    accessorKey: "status",
    cell:({row}) => <StockStatusBadge status={row.getValue("status") as StockStatus}/>,
    header: "Status",
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
      const payment = row.original
 
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Mark as complete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Mark as pending
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit request</DropdownMenuItem>
            <DropdownMenuItem>Cancel request</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]