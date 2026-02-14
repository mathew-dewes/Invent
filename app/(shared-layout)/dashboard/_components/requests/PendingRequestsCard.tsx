import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { daysAgo } from "@/lib/helpers";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { PendingRequestDropDown } from "./PendingRequestDropDown";


type Props = {

requestCount: number,
    tableData: {
        id: string,
        createdAt: Date,
        quantity: number,
        customer: string,
        stockItem: {
            name: string,
           
        }


    }[]

}

const headings = ['Placed', 'Item', 'QTY', 'Customer']

export default function PendingRequestCard({ tableData, requestCount }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-1.5">
            <CircleAlert className="text-yellow-400"/>
         <h1 className="text-lg">Pending Requests</h1>
     
          </div>
                  </CardTitle>
                <CardDescription>
                    <p>Tool requests to pick</p>
                      <p className="mt-1">Viewing {requestCount >= 5 ? "5" : requestCount} of {requestCount}  most recent requests</p>
                </CardDescription>
            </CardHeader>
            <CardContent>

                <Table>
                    <TableHeader>
                        <TableRow>
                            {headings.map((head, key) => {
                                return <TableHead className={head === "Location" ? "text-right" : ""} key={key}>{head}</TableHead>
                            })}



                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((item) => {
               
                            
                 return (<TableRow key={item.id}>

                                <TableCell>
                                   <p>{daysAgo(item.createdAt)}</p>
                              </TableCell>
                                <TableCell>
                                    <p className="font-medium">{item.stockItem.name}</p></TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.customer}</TableCell>
                                <TableCell><PendingRequestDropDown requestId={item.id}/></TableCell>
                            </TableRow>)
                        })}



                    </TableBody>

                </Table>



            </CardContent>
            <CardFooter>
                
            
                         <Link className={buttonVariants({variant:"default", size:"sm"})} href={'/requests?status=PENDING'}>View Requests</Link>
                
       
           
             
            </CardFooter>
        </Card>
    )
}