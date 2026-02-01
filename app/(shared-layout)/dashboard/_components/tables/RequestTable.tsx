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
            <TableHead>QTY</TableHead>


            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {

    const createdAt = formatTimeToNZ(request.createdAt);

            return (
              <TableRow onClick={()=>linkToRequests(request.status)} className={`text-sm ${request.status === "OPEN" ? "font-medium bg-blue-300/70 cursor-pointer hover:bg-blue-300/90" : "text-white/70 pointer-events-none "} `} key={request.id}>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{request.customer}</TableCell>
                <TableCell>{request.stockItem.name}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell className="text-right">{request.status}</TableCell>
              </TableRow>
            )
          }

          )}
        </TableBody>

      </Table>
    </CardContent>
    <CardFooter>
      <Link href={'/requests'} ><Button>View requests</Button></Link>

    </CardFooter>
  </Card>)
}