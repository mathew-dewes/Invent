"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PurchaseStatus } from "@/generated/prisma/enums";
import { formatTimeToNZ } from "@/lib/helpers";
import { useRouter } from "next/navigation";



type TableProps = {
  id: string,
  createdAt: Date,
  vendor: {name: string},
  stockItem:{name: string},
  quantity: number,
  status: PurchaseStatus

}[];


export default function PurchaseTable({ purchases }:
  { purchases: TableProps }){

        const router = useRouter();
    
        function linkToRequests (status: PurchaseStatus){
          router.push(`/requests?status=${status}`)
    };

    function generateStyle(status: PurchaseStatus){
         let style;
      switch (status){
     
        case "PLACED":
          style = 'bg-blue-300/70 font-medium hover:bg-blue-300/80'
          break;
          default:
          style = 'text-white/70 pointer-events-none'

      };

      return style + " cursor-pointer"

    }
    
return <Card  className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Recent purchases</CardTitle>
        <CardDescription>
           Total purchases: 112
        </CardDescription>
      </CardHeader>
      <CardContent>
          <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Date</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Item</TableHead>
          <TableHead className="text-center">QTY</TableHead>
  
        </TableRow>
      </TableHeader>
      <TableBody>
      {purchases.map((purchase) => {
     
         const createdAt = formatTimeToNZ(purchase.createdAt);
     
                 return (
                   <TableRow onClick={()=>linkToRequests(purchase.status)} 
                   className={`text-sm ${generateStyle(purchase.status)}`} key={purchase.id}>
                     <TableCell>{createdAt}</TableCell>
                     <TableCell>{purchase.vendor.name}</TableCell>
                     <TableCell>{purchase.stockItem.name}</TableCell>
   
                     <TableCell className="text-center">{purchase.quantity}</TableCell>
                   </TableRow>
                 )
               }
     
               )}
      </TableBody>
  
    </Table>
      </CardContent>
      <CardFooter>
        <Link href={'/purchases'} ><Button variant={"outline"}>View purchases</Button></Link>
  
      </CardFooter>
    </Card>
}