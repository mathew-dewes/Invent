import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseStatus } from "@/generated/prisma/enums";
import { daysAgo } from "@/lib/helpers";
import { ClipboardClock } from "lucide-react";
import Link from "next/link";
import { IncomingPurchasesDropDown } from "./IncomingPurchasesDropDown";

type Props = {
    purchaseCount: number,

    tableData: {
        id: string,
        createdAt: Date,
        quantity: number,
        status: PurchaseStatus,
        purchaseNumber: number,
        vendor: {
            name: string,
            email: string
        },
        stockItem: {
            name: string
        }


    }[]

}

export default function IncomingStockCard({ tableData, purchaseCount }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-1.5">
                        <ClipboardClock className="text-blue-300"/>
                    <h1 className="text-lg">Incoming Purchases</h1>
                    </div>
                  </CardTitle>
                <CardDescription>
           <p>Items at or below reorder point</p>
                      <p className="mt-1">Viewing {purchaseCount >= 5 ? "5" : purchaseCount} of {purchaseCount} recently placed purchases</p>
       
                </CardDescription>
            </CardHeader>
            <CardContent>

                <Table>
                    <TableHeader>
                        <TableRow>
                            {['Placed', 'Item', 'QTY', 'Vendor'].map((head, key) => {
                                return <TableHead key={key}>{head}</TableHead>
                            })}



                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((item) => {
                            return (<TableRow key={item.id}>

                                <TableCell>{daysAgo(item.createdAt)}</TableCell>
                                <TableCell>
                                    <p className="truncate w-20">{item.stockItem.name}</p></TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell >
                                    <p className="truncate w-20">{item.vendor.name}</p></TableCell>
                                <TableCell><IncomingPurchasesDropDown vendorEmail={item.vendor.email} purchaseId={item.id}/></TableCell>
                       
                            </TableRow>)
                        })}



                    </TableBody>

                </Table>



            </CardContent>
            <CardFooter>
                <Link className={buttonVariants({variant:"default", size:"sm"})} href={'/purchases?status=PLACED'}>
                View Purchases</Link>

            </CardFooter>
        </Card>
    )
}