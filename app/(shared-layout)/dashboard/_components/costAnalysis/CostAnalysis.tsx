import { getCostCentreChartData, getTopSpendingCostCentres } from "@/lib/queries/finance";
import { TopSpendingCostCentresChart } from "./TopSpendingCostCentresChart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { convertToMoney } from "@/lib/helpers";
import Link from "next/link";

export default async function CostAnalysis(){



    const spend = await getCostCentreChartData();
    const costCentres = await getTopSpendingCostCentres();

    
    
    if (spend.length == 0) return
    
    
    const totalSpend = spend.reduce((acc, item)=>{
        return acc + item._sum
    }, 0)


    


    


    

    
    return (
        <div className="border-2 p-5 rounded-xl bg-secondary col-span-2 grid-cols-2 grid gap-5">
          <div className="col-span-2 md:col-span-1">
               <h1 className="font-semibold text-xl py-3 ml-1 text-center md:text-left">Cost Analysis</h1>
        <TopSpendingCostCentresChart data={spend} totalSpend={totalSpend}/>
    
          
        
                    </div>
                                                           <Card className="col-span-2 md:col-span-1">
                            <CardHeader>
                                <CardTitle>Cost Centres</CardTitle>
                            </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {['Cost Centre','Code', 'Spend'].map((head, key) => {
                                    return <TableHead className={`${head == "Actions" || head == "Status" ? "text-center" : ""}`} key={key}>{head}</TableHead>
                                })}



                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {costCentres.map((centre)=>{
                                return     <TableRow key={centre.id} className={'font-medium'}>

                                    <TableCell>{centre.name}</TableCell>
                                    <TableCell>{centre.code}</TableCell>
                         
                            
                             
                                    <TableCell>{convertToMoney(centre.totalCost)}</TableCell>
               




                                </TableRow>
                            })}
                       
                    
                    






                        </TableBody>

                    </Table>

                </CardContent>
                    <CardFooter>
                        <Link className={buttonVariants()} href={'/cost-centre'}>View All</Link>

                </CardFooter>




            </Card>
        </div>
    )
}