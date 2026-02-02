import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MostRequestedItemsChart } from "./charts/MostRequestedItemsChart"
import { MostRequestedTable } from "./tables/MostRequestedTable"
import { getMostRequestedChartData } from "@/lib/queries/request"

export default async function MostRequested(){

  const requests = await getMostRequestedChartData();


  
    return (
        <div className="grid grid-cols-10 gap-5">
        
                            <div className="col-span-6">
                                <MostRequestedItemsChart requests={requests} />
                            </div>
                            <div className="col-span-4">
                                <Card  className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Most requested items</CardTitle>
        <CardDescription>
          Must requested items
        </CardDescription>
      </CardHeader>
      <CardContent>
       <MostRequestedTable/>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
                            </div>
        
        
        
                        </div>
    )
}