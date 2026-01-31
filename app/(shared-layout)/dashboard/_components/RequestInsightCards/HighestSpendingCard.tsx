
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HighestSpendingTable } from "../tables/HighestSpendingTable"

export function HighestSpendingCard() {
  return (
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
  )
}
