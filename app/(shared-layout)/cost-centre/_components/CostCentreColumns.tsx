"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { CostCentre } from "@/lib/types"


export const CostCentreColumns: ColumnDef<CostCentre>[] = [
      {
    id: "select",
 
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
    accessorKey: "name",

    header: "Name",
  },

      {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "requestsCount",
    header: "Requests",
  },

     {
    accessorKey: "totalCost",
      header: () => <div>Total Spend</div>,
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
    cell: ({row}) => {
       const costCentreId = row.original.id;
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
            <Link href={`/cost-centre/${costCentreId}/edit`}>
            <DropdownMenuItem>
              Edit details
            </DropdownMenuItem></Link>


          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]