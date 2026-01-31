
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MostRequestedTable } from "../tables/MostRequestedTable"

export function MostRequestedCard() {
  return (
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
  )
}
