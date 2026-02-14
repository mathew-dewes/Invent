

import { getInventoryChartData, getLowestStockedItems } from "@/lib/queries/stock";
import { StockCountChart } from "../charts/StockCountChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventoryDropDown } from "./InventoryDropDown";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { getIncomingPurchaseStockIds } from "@/lib/queries/purchase";




export default async function Inventory() {

    const [chartData, lowestStockedItems, purchaseStockIds] = await Promise.all([getInventoryChartData(), getLowestStockedItems(), getIncomingPurchaseStockIds()]);





    function rowStyle(count: number, reorderPoint: number, stockId: string) {

        const inComingStock = purchaseStockIds.some(
            (p) => p.stockId === stockId
        );

        if (inComingStock) {
            return 'bg-blue-300 hover:bg-blue-300/90 text-black font-medium'

        } else if (count <= reorderPoint / 2) {
            return 'bg-red-300 hover:bg-red-300/90 text-black font-medium'
        } else if (count <= reorderPoint) {
            return 'bg-orange-300 hover:bg-orange-300/90 text-black font-medium'
        } 

    }

    if (!chartData || chartData.length == 0) return

    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 grid-cols-2 grid gap-10">
            <div>
                <h1 className="font-semibold text-xl py-3 text-center md:text-left">Inventory Overview</h1>
                <StockCountChart data={chartData} />
                <div className="flex gap-2 mt-5">
                    <h2 className="font-semibold">Key:</h2>
                    <Badge className="bg-red-400">Critical</Badge>
                    <Badge className="bg-orange-300">Low</Badge>
                    <Badge className="bg-green-300">Good</Badge>
                    <Badge className="bg-blue-300">Incoming Purchase</Badge>

                </div>
            </div>

            <Card>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {['Stock', 'SOH', 'ROP', 'Vendor', 'Actions'].map((head, key) => {
                                    return <TableHead className={`${head == "Actions" ? "text-center" : ""}`} key={key}>{head}</TableHead>
                                })}



                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowestStockedItems.map((item) => {

                                return <TableRow className={cn(rowStyle(item.quantity, item.reorderPoint, item.id))} key={item.id}>

                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.reorderPoint}</TableCell>
                                    <TableCell>{item.vendor.name}</TableCell>
                                    <TableCell className="flex justify-center gap-2">
                                        <InventoryDropDown stockId={item.id} />


                                    </TableCell>




                                </TableRow>
                            })}






                        </TableBody>

                    </Table>

                </CardContent>




            </Card>















        </div>
    )
}