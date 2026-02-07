import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { ReadyRequestDropDown } from "./ReadyRequestDropDown";

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
       
        }


    }[]

}

export default function ReadyRequestCard({ title, description, headings, tableData }: Props) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-1.5">
            <CircleCheckBig className="text-blue-300"/>
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
                                   <p>{item.customer}</p>
                              </TableCell>
                                <TableCell>
                                    <p className="font-medium">{item.stockItem.name}</p></TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell><ReadyRequestDropDown requestId={item.id}/></TableCell>
                 
                        

                            </TableRow>)
                        })}



                    </TableBody>

                </Table>



            </CardContent>
            <CardFooter>
            
                         <Link className={buttonVariants({variant:"outline", size:"sm"})} href={'/requests?status=READY'}>View Requests</Link>
                
       
           
             
            </CardFooter>
        </Card>
    )
}