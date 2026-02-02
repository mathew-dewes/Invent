import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HighestSpendingPlantChart } from "./charts/HighestSpendingPlantChart"
import { HighestSpendingTable } from "./tables/HighestSpendingTable"
import { getHighestSpendingCustomersCostCentreAndSpend, getMonthlyHighestSpendingChartData } from "@/lib/queries/request";

export default async function HightestSpend(){

  const [chartData, tableData] = await Promise.all([getMonthlyHighestSpendingChartData(), getHighestSpendingCustomersCostCentreAndSpend()])


    return (
         <div className="grid grid-cols-10 gap-5">
                            <div className="col-span-6">
                                <HighestSpendingPlantChart data={chartData} />
                            </div>
        
                            <div className="col-span-4">
                               <Card  className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          Highest spending customers
        </CardDescription>
      </CardHeader>
      <CardContent>
       <HighestSpendingTable tableData={tableData}/>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
                            </div>
        
        
                        </div>
    )
}