"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Finance } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"


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
    accessorKey: "customerName",
    header: "Customer",
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
      console.log(row.original);
      
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
      header: ({column}) => <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>,
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
      cell: ({ row }) => {
    const costCentre = row.original.costCentre;
    return <span>{costCentre?.name ?? "STOCK"}</span>;
  },
    header: "Cost Centre",
  },



]