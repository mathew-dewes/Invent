import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { daysAgo } from "@/lib/helpers";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

type Props = {

    title: string,
    description: string,
    headings: string[],
    tableData: {
        id: string,
        createdAt: Date,
        quantity: number,
        customer: string,
        stockItem: {
            name: string,
            location: string
        }


    }[]

}

export default function OpenRequestsCard({ title, description, headings, tableData }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-1.5">
            <CircleAlert className="text-red-400"/>
            <h1 className="text-lg">{title}</h1>
     
          </div>
                  </CardTitle>
                <CardDescription>
                    {description}
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
                                <TableCell className="text-right">{item.stockItem.location}</TableCell>

                            </TableRow>)
                        })}



                    </TableBody>

                </Table>



            </CardContent>
            <CardFooter>
                
            
                         <Link className={buttonVariants({variant:"outline", size:"sm"})} href={'/requests?status=OPEN'}>View Requests</Link>
                
       
           
             
            </CardFooter>
        </Card>
    )
}