import { getPurchaseChartData, getRecentPurchases } from "@/lib/queries/purchase";
import { TotalSpendChart } from "../charts/TotalSpendChart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseStatus } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";
import { convertToMoney } from "@/lib/helpers";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";


export default async function Purchases(){

    const [data, purchases] = await Promise.all([getPurchaseChartData(), getRecentPurchases()])

    const formattedDate = (date: Date)=>{
                  return new Intl.DateTimeFormat("en-NZ",{
    timeZone: "Pacific/Auckland",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
            }

const statusBadge = (status: PurchaseStatus) =>{
    if (status == "PLACED"){
        return <Badge className="bg-blue-300 text-black">Placed</Badge>
    } else {
        return <Badge className="bg-green-300 text-black">Received</Badge>
    }
}
            
    return (
        <div className="border-2 p-3 md:p-5  rounded-xl bg-secondary col-span-2 grid-cols-2 grid gap-5">
            <div className="col-span-2 md:col-span-1">
     <h1 className="font-semibold text-xl py-3 text-center md:text-left">Purchases</h1>
             <TotalSpendChart data={data}/>

            </div>
                        <Card className="col-span-2 md:col-span-1">
                            <CardHeader>
                                <CardTitle>Recent Purchases</CardTitle>
                            </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {['Placed', 'Item', 'Status', 'Vendor', 'Actions'].map((head, key) => {
                                    return <TableHead className={`${head == "Actions" || head == "Status" ? "text-center" : ""}`} key={key}>{head}</TableHead>
                                })}



                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchases.map((purchase)=>{
                                return  <TableRow key={purchase.id} className={'font-medium'}>

                                    <TableCell>{formattedDate(purchase.createdAt)}</TableCell>
                                    <TableCell>{purchase.stockItem.name}</TableCell>
                                    <TableCell className="text-center">{statusBadge(purchase.status)}</TableCell>
                                    <TableCell>{purchase.vendor.name}</TableCell>
                       
                                    <TableCell>
                          {convertToMoney(Number(purchase.totalCost)) }


                                    </TableCell>




                                </TableRow>
                            })}
                       
                       
                    






                        </TableBody>

                    </Table>

                </CardContent>
                <CardFooter>
                    <Link className={buttonVariants()} href={'/purchases'}>View All</Link>
        
                </CardFooter>




            </Card>
   

        </div>
    )
}