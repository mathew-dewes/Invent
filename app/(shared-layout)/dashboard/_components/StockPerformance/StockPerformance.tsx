
import {getMostRequestedChartData } from "@/lib/queries/request"
import { MostRequestedItemsChart } from "../charts/MostRequestedItemsChart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { getHighestPerformingItems } from "@/lib/queries/stock";
import { convertToMoney } from "@/lib/helpers";


export default async function StockPerformance(){

    const [requests, topStock] = await Promise.all([getMostRequestedChartData(), getHighestPerformingItems()])
  

  const totalRequests = requests.reduce((acc, item)=>{
    return acc + item.requests
  }, 0);


  
  
  

  
if (requests.length == 0) return

  
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 grid-cols-2 grid gap-5">
        
                            <div>
                                  <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Stock Performance</h1>
                      
                                <MostRequestedItemsChart data={requests} issuedStock={totalRequests} />
                            </div>
                                              <Card>
                            <CardHeader>
                                <CardTitle>Highest performing stock items</CardTitle>
                            </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {['Item', 'Issued', 'Revenue'].map((head, key) => {
                                    return <TableHead className={`${head == "Revenue" || head == "Issued" ? "text-center" : ""}`} key={key}>{head}</TableHead>
                                })}



                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topStock.map((stock)=>{
                            return <TableRow key={stock.id} className={'font-medium'}>

                                    <TableCell>{stock.name}</TableCell>
                                    <TableCell className="text-center">{stock.totalIssued}</TableCell>
                                    <TableCell className="text-center">{convertToMoney(stock.totalRevenue)}</TableCell>
                              
                       
                   




                                </TableRow>
                            })}
                       
                  
                    






                        </TableBody>

                    </Table>

                </CardContent>
         




            </Card>
       
   
                        </div>
    )
}