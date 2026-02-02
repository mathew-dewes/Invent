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
import { RequestStatus } from "@/generated/prisma/enums";
import { formatTimeToNZ } from "@/lib/helpers"
import { useRouter } from "next/navigation"


type TableProps = {
  id: string,
  createdAt: Date,
  customer: string,
  stockItem: { name: string },
  quantity: number,
  status: RequestStatus

}[];




export default function RequestTable({ requests }:
  { requests: TableProps }) {

    const router = useRouter();

    function linkToRequests (status: RequestStatus){
      router.push(`/requests?status=${status}`)
};

   function generateStyle(status: RequestStatus){
         let style;
      switch (status){
     
        case "OPEN":
          style = 'bg-yellow-300/70 font-medium hover:bg-yellow-300/80'
          break;
        case "READY":
          style = 'bg-blue-300/70 font-medium hover:bg-blue-300/80'
          break;
          default:
          style = 'text-white/70 pointer-events-none'

      };

      return style + " cursor-pointer"

    }


    
  return (<Card className="mx-auto w-full">
    <CardHeader>
      <CardTitle>Recent requests</CardTitle>
      <CardDescription>
      Total requests: 112
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-center">QTY</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {

    const createdAt = formatTimeToNZ(request.createdAt);

            return (
              <TableRow onClick={()=>linkToRequests(request.status)} className={`text-sm ${generateStyle(request.status)} `} key={request.id}>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{request.customer}</TableCell>
                <TableCell>{request.stockItem.name}</TableCell>
                <TableCell className="text-center">{request.quantity}</TableCell>
      
              </TableRow>
            )
          }

          )}
        </TableBody>

      </Table>
    </CardContent>
    <CardFooter>
      <Link href={'/requests'} ><Button variant={"outline"}>View requests</Button></Link>

    </CardFooter>
  </Card>)
}