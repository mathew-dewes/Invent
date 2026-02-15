import { getCostCentreSpend } from "@/lib/queries/finance";
import { TopSpendingCostCentresChart } from "./TopSpendingCostCentresChart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function CostAnalysis(){

    const spend = await getCostCentreSpend();
    
    
    
    
    const totalSpend = spend.reduce((acc, item)=>{
        return acc + item._sum
    }, 0)


    


    if (spend.length == 0) return

    
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 grid-cols-2 grid gap-5">
          <div>
               <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Cost Analysis</h1>
       
        {/* <TotalSpendChart data={data}/> */}
        <TopSpendingCostCentresChart data={spend} totalSpend={totalSpend}/>
    
          
        
                    </div>
                                                           <Card>
                            <CardHeader>
                                <CardTitle>Recent Purchases</CardTitle>
                            </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {['Cost Centre',, 'Code', 'Requests', 'Spend', 'Actions'].map((head, key) => {
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