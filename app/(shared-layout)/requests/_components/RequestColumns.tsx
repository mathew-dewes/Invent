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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Request } from "@/lib/types"

import { startTransition } from "react"
import { toast } from "sonner"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import RequestStatusBadge from "@/components/web/badges/RequestStatusBadge"
import { cancelAndReturnRequest, cancelRequest, MarkComplete, markReady } from "@/lib/actions/request"
import { convertToMoney } from "@/lib/helpers"



const HideFields = () => {
  const searchParams = useSearchParams().get('status');





  if (searchParams == "COMPLETE" || !searchParams) {
    return true
  } else {

    return false
  }

}


export const Requestcolumns: ColumnDef<Request>[] = [

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        hidden={HideFields()}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return <Checkbox
        hidden={HideFields()}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "requestNumber",

    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    cell: ({ row }) => <RequestStatusBadge status={row.original.status} />,
    header: "Status",
  },
  {
    accessorKey: "completedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Completed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue();

      if (!value) return "TBC"; // or "Pending"

      const date = new Date(value as string);

      return date.toLocaleDateString("en-NZ", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
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
    header: () => <div>Requested</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity"));
      const stockQuantity = row.original.stockItem?.quantity ?? 0;
      const requestQuantity = row.original.quantity;
      const status = row.original.status;

      const style = () => {
        if (status == "OPEN" && requestQuantity > stockQuantity) {
          return 'text-red-400'
        } else if (status !== "OPEN") {
          return 'text-white'
        } else {
          return 'text-green-400'
        }
      }

      return <div className={style()}>{amount}</div>
    },
  },


  {
    accessorKey: "stockItem.quantity",
    header: () => <div>SOH</div>,
    enableHiding: true,

    cell: ({ row }) => {
      const stockQuantity = row.original.stockItem?.quantity ?? 0;


      return <div>{stockQuantity}</div>
    },
  },


  {
    accessorKey: "costCentre.name",
    header: "Cost centre",
  },
  {
    accessorKey: "note",
    header: "Notes",
  },




  {
    id: "actions",
    cell: ({ row }) => {

      const requestId = row.original.id;
      // const stockId = row.original.stockItem.id;
      // const requestQuantity = row.original.quantity;
      const requestStatus = row.original.status;
      // const stockQuantity = row.original.stockItem?.quantity ?? 0;







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


            <DropdownMenuItem hidden={requestStatus == "COMPLETE" || requestStatus == "READY"} asChild>


              <form action={
                () => {
                  startTransition(async () => {

                    const res = await markReady(requestId);

                    if (res?.success){
                      toast.success(res.message);
                      toast.success(res.updatedStock?.requestCount  + " x " + res.updatedStock?.name + " depleted");
                      toast.info(res.updatedStock?.name + " stock is now: " + res.updatedStock?.updatedCount);
                      
                    } else {
                      toast.error(res?.message)
                    }


                  })

                }
              }>

                <button type="submit">Mark Ready</button>
              </form>


            </DropdownMenuItem>

            <DropdownMenuItem hidden={requestStatus == "COMPLETE" || requestStatus == "OPEN"} asChild>
              <form action={
                () => {
                
                  startTransition(async () => {

                    const res = await MarkComplete(requestId);

                    if (res.success) {
                      toast.success(res.message);
                      toast.info(`${res.customer} was issued ${res.issued?.toString()} x ${res.stockItem}`);
                      toast.info(`${res.costCentre} was charged ${convertToMoney(res.chargeAmount ?? 0)}`)
                    } else {
                      toast.error(res.message)
                    }
                  })

                }
              }>
                <input type="hidden" name="requestId" value={requestId} />
                <button type="submit">Mark as Complete</button>
              </form>


            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link className={`${requestStatus !== "OPEN" ? "hidden" : ""}`} href={`/requests/${requestId}/edit`}><DropdownMenuItem>Edit request</DropdownMenuItem></Link>

            <DropdownMenuItem>
              <form action={
                () => {
                  startTransition(async () => {

                    if (requestStatus !== "OPEN") {

                      const res = await cancelAndReturnRequest(requestId);
                      if (res.success) {
                        toast.success(res.message);
                        toast.success("Request #" + res.requestNumber + " was removed")
                      }
                    } else {
                      const res = await cancelRequest(requestId);
                      if (res.success) {
                        toast.success(res.message)
                      }

                    }
                  })

                }
              }>
                <input type="hidden" name="requestId" value={requestId} />
                <button type="submit">{requestStatus !== "OPEN" ? "Cancel and return" : "Cancel request"}</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]