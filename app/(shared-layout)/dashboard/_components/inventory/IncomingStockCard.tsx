import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseStatus } from "@/generated/prisma/enums";
import { daysAgo } from "@/lib/helpers";
import { ClipboardClock } from "lucide-react";
import Link from "next/link";

type Props = {

    title: string,
    description: string,
    headings: string[],
    tableData: {
        id: string,
        createdAt: Date,
        quantity: number,
        status: PurchaseStatus,
        vendor: {
            name: string
        },
        stockItem: {
            name: string
        }


    }[]

}

export default function IncomingStockCard({ title, description, headings, tableData }: Props) {
    return (
        <Card className="w-full border-b-blue-200 border-l-blue-200 border-b-8  border-l-6">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-1.5">
                        <ClipboardClock/>
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
                                return <TableHead key={key}>{head}</TableHead>
                            })}



                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((item) => {
                            return (<TableRow key={item.id}>

                                <TableCell>{daysAgo(item.createdAt)}</TableCell>
                                <TableCell>
                                    <p className="font-medium">{item.stockItem.name}</p></TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.vendor.name}</TableCell>

                            </TableRow>)
                        })}



                    </TableBody>

                </Table>



            </CardContent>
            <CardFooter>
                <Link className={buttonVariants({variant:"outline", size:"sm"})} href={'/purchases?status=PLACED'}>
                View Purchases</Link>

            </CardFooter>
        </Card>
    )
}