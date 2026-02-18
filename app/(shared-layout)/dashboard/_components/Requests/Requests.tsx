import { Badge } from "@/components/ui/badge";
import { StackedRequestChart } from "../charts/StackedRequestChart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecentRequests, getRequestChartData, getWeeklyRequestsByStatusCount } from "@/lib/queries/request";
import { RequestStatus } from "@/generated/prisma/enums";
import { RequestActionDropdown } from "./RequestActionDropdown";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Requests() {

    const [requests, data, statusCount] = await Promise.all([getRecentRequests(), getRequestChartData(), getWeeklyRequestsByStatusCount()])


    

    const statusBadge = (status: RequestStatus) =>{
        if (status == "READY"){
            return <Badge className="bg-blue-300">Ready</Badge>
        } else if (status == "PENDING") {
            return <Badge className="bg-yellow-200">Pending</Badge>
        } else {
            return <Badge className="bg-green-300">Complete</Badge>
        }
    }

        const formattedDate = (date: Date)=>{
                  return new Intl.DateTimeFormat("en-NZ",{
    timeZone: "Pacific/Auckland",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
            }


    
    return (
        <div className="border-2 p-3 md:p-5 rounded-xl bg-secondary col-span-2 grid-cols-10 grid gap-5">
            <div className="md:col-span-4 col-span-10">
                <h1 className="font-semibold text-xl py-3 text-center md:text-left">Requests</h1>
                <StackedRequestChart statusCount={statusCount} data={data} />
                    <div className="flex gap-2 mt-5">
                    <h2 className="font-medium">Key:</h2>
                    <Badge className="bg-yellow-200">Pending</Badge>
                    <Badge className="bg-blue-300">Ready</Badge>
                    <Badge className="bg-green-300">Complete</Badge>

                </div>
            </div>

            <Card className="md:col-span-6 col-span-10">
                <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {['Placed', 'Item', 'QTY', 'Status', 'Customer', 'Actions'].map((head, key) => {
                                    return <TableHead className={`${head == "Actions" || head == "Status" ? "text-center" : ""}`} key={key}>{head}</TableHead>
                                })}



                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request)=>{
                                return   <TableRow key={request.id} className={'font-medium'}>

                                <TableCell>{formattedDate(request.createdAt)}</TableCell>
                                <TableCell>{request.stockItem.name}</TableCell>
                                <TableCell className="text-center">{request.quantity}</TableCell>
                                        <TableCell className="flex justify-center">{statusBadge(request.status)}</TableCell>
                                <TableCell>{request.customer}</TableCell>
                        

                                <TableCell hidden={request.status == "COMPLETE"} className="flex justify-center gap-2">
                                    <RequestActionDropdown status={request.status} requestId={request.id}/>


                                </TableCell>




                            </TableRow>
                            })}


                          







                        </TableBody>

                    </Table>

                </CardContent>

    <CardFooter>
        <Link className={buttonVariants()} href={'/requests'}>View All</Link>
                
                </CardFooter>


            </Card>

        </div>
    )
}