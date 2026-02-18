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

import { Vendor } from "@/lib/types"
import Link from "next/link"
import { startTransition } from "react"
import { removeVendor } from "@/lib/actions/vendor"
import { toast } from "sonner"


export const VendorColumns: ColumnDef<Vendor>[] = [
      {
    id: "select",
 
  },
  {
    accessorKey: "name",

    header: "Name",
  },

      {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },
        {
    accessorKey: "email",
    header: "Email",
  },
    {
    accessorKey: "contactName",
    header: "Contact Person",
    
  },
    {
    accessorKey: "PONumber",
    header: "#PO",
    
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const vendorId = row.original.id;

     
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
            <Link href={`/vendors/${vendorId}/edit`}>
            <DropdownMenuItem>
              Edit details
            </DropdownMenuItem></Link>
         
            <DropdownMenuItem>
              <form action={
                async()=>{
                  startTransition(async()=>{
                    const res = await removeVendor(vendorId);
                    if (res.success){
                      toast.success(res.message)
                    } else {
                      toast.error('There was an error')
                    }
                  })
                }
              }>
                <button type="submit">Delete vendor</button>
              </form>
    
            </DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]