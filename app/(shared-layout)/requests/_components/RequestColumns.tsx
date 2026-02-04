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

import { startTransition } from "react"
import { cancelRequest, changeRequestStatus } from "@/lib/actions/request"
import { toast } from "sonner"
import {checkSingleStockItemQuantity, decreaseStockQuantity } from "@/lib/actions/stock"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import RequestStatusBadge from "@/components/web/badges/RequestStatusBadge"



const HideFields = () =>{
  const searchParams = useSearchParams().get('status');


  
  

  if (searchParams == "COMPLETE" || !searchParams){
    return true
  } else{

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
    cell: ({ row }) => <RequestStatusBadge status={row.original.status} />,
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
    header: () => <div className={`${HideFields() ? "hidden" : ""}`}>Requested</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("quantity"));
    const stockQuantity = row.original.stockItem?.quantity ?? 0;
          const requestQuantity = row.original.quantity;
          const status = row.original.status;



      
      return <div className={`${status !== "OPEN" ? "hidden" : requestQuantity > stockQuantity ? "text-red-400" : "text-green-400"}`}>{amount}</div>
    },
  },


  {
    accessorKey: "stockItem.quantity",
    header: () => <div>Stock QTY</div>,
    cell: ({ row }) => {
          const stockQuantity = row.original.stockItem?.quantity ?? 0;
             const status = row.original.status;
  
        
      return <div className={`${status !== "OPEN" ? "hidden" : ""}`}>{stockQuantity}</div>
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
      const requestQuantity = row.original.quantity;
      const requestStatus = row.original.status;
      const stockQuantity = row.original.stockItem?.quantity ?? 0;
    




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
      

            <DropdownMenuItem className={`${["READY", "COMPLETE"].includes(requestStatus) || requestQuantity > stockQuantity ? "hidden" : ""}`} asChild>


              <form action={
                () => {
                  startTransition(async () => {


                    try {
                      // Check inventory amount of selected stock item
                      const inventoryCheck = await checkSingleStockItemQuantity(stockId, requestQuantity);

                      if (inventoryCheck.success){
                        await decreaseStockQuantity(stockId, requestQuantity);
                        await changeRequestStatus(requestId, "READY")
                        toast.success("Inventory check success!");
            
            
                      } else {
                        toast.warning("Insufficient stock levels")
                      }
                    

            

                    } catch (error) {
                      console.log(error);
                      toast.error("There was error deleting this stock item")

                    }
                  })

                }
              }>
          
                <button type="submit">Mark as Ready</button>
              </form>


            </DropdownMenuItem>
            
            <DropdownMenuItem className={`${["OPEN", "COMPLETE"].includes(requestStatus) ?  "hidden" : ""}`} asChild>


              <form action={
                () => {
                  startTransition(async () => {


                    try {

                     await changeRequestStatus(requestId, 'COMPLETE');

       

  

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

                      await cancelRequest(formData);

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