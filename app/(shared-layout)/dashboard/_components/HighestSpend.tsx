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

export default function HightestSpend(){
    return (
         <div className="grid grid-cols-10 gap-5">
                            <div className="col-span-6">
                                <HighestSpendingPlantChart />
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
       <HighestSpendingTable/>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
                            </div>
        
        
                        </div>
    )
}