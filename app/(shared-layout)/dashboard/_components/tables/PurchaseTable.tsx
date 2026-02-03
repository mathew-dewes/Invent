"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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

const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);


export default function PurchaseTable({ purchases }:
  { purchases: TableProps }){

        const router = useRouter();
    
        function linkToRequests (status: string, delayed: boolean){
          if (delayed){
            router.push('/purchases?status=DELAYED')
          } else {
     router.push(`/purchases?status=${status}`)
          }
     
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
    
return <Card  className="mx-auto w-full min-h-100">
      <CardHeader>
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
     
         const createdAtDisplay = formatTimeToNZ(purchase.createdAt);
         const isOlderThanThreeDays = new Date(purchase.createdAt) < threeDaysAgo && purchase.status == "PLACED";

    
    
     
                 return (
                   <TableRow onClick={()=>linkToRequests(purchase.status, isOlderThanThreeDays)} 
                   className={`text-sm ${generateStyle(purchase.status)} ${isOlderThanThreeDays ? "bg-orange-400/70 font-medium hover:bg-orange-400/80" : ""}`} key={purchase.id}>
                     <TableCell>{createdAtDisplay}</TableCell>
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