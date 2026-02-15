
import { getMostRequestedChartData } from "@/lib/queries/request"
import { MostRequestedItemsChart } from "../charts/MostRequestedItemsChart";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";


export default async function StockPerformance(){

  const requests = await getMostRequestedChartData();

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
                       
                        <TableRow className={'font-medium'}>

                                    <TableCell>fe</TableCell>
                                    <TableCell>fef</TableCell>
                                    <TableCell className="text-center">fefe</TableCell>
                                    <TableCell>fef</TableCell>
                       
                                    <TableCell className="flex justify-center gap-2">
                          {/* <PurchaseDropDown/> */}


                                    </TableCell>




                                </TableRow>
                    






                        </TableBody>

                    </Table>

                </CardContent>
                    <CardFooter>
                    <Button>View All</Button>
                </CardFooter>




            </Card>
       
   
                        </div>
    )
}