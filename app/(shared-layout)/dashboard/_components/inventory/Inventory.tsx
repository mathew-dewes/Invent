

import { getInventoryChartData, getLowestStockedItems } from "@/lib/queries/stock";
import { StockCountChart } from "../charts/StockCountChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventoryDropDown } from "./InventoryDropDown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getIncomingPurchaseStockIds } from "@/lib/queries/purchase";




export default async function Inventory() {

    const [chartData, lowestStockedItems, purchaseStockIds] = await Promise.all([getInventoryChartData(), getLowestStockedItems(), getIncomingPurchaseStockIds()]);





    function StatusBadge(count: number, reorderPoint: number, stockId: string) {

        const inComingStock = purchaseStockIds.some(
            (p) => p.stockId === stockId
        );

        if (inComingStock) {
            return  <Badge className="bg-blue-300">Purchased</Badge>
        
             

        } else if (count <= reorderPoint / 2) {
            return   <Badge className="bg-red-400">Critical</Badge>
        } else if (count < reorderPoint) {
            return     <Badge className="bg-orange-300">Low</Badge>
        } 

    }

    if (!chartData || chartData.length == 0) return

    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 grid-cols-2 grid gap-5">
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
                                {['Stock', 'QTY', 'Status', 'Vendor', 'Actions'].map((head, key) => {
                                    return <TableHead className={`${head == "Actions" || head == "Status" ? "text-center" : ""}`} key={key}>{head}</TableHead>
                                })}



                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowestStockedItems.map((item) => {

                                return <TableRow className={'font-medium'} key={item.id}>

                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className="text-center">{StatusBadge(item.quantity, item.reorderPoint, item.id)}</TableCell>
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