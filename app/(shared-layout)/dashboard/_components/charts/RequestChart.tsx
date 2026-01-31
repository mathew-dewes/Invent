"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { RequestStatus } from "@/generated/prisma/enums"

export const description = "A bar chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;


// const data = [
//   { name: "Open", requests: 21, status: "OPEN" as RequestStatus  },
//   { name: "Pending", requests: 5, status: "PENDING" as RequestStatus  },
//   { name: "Ready", requests: 11, status: "READY" as RequestStatus  },


 
// ];

function getBarColor(status: RequestStatus) {
  switch (status) {
    case "COMPLETE":
      return "#86efac";   // green-500 // yellow-500
    case "READY":
      return "#93c5fd";   // red-500
    default:
      return "#fb923c";   // slate-400
  }
}


type Props = {
  chartData:{name:string, requests: number, status: RequestStatus}[],
  activeRequestCount: number
}



export function RequestChart({chartData, activeRequestCount}:Props
) {


  const activeMessage = () =>{

    if (activeRequestCount > 0){
return `You have ${activeRequestCount} requests needing attention`
    } else{
      return 'You have no urgent requests at this time. Well done'
    }

}
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active requests</CardTitle>
        <CardDescription>
          {activeMessage()}
          </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="requests"  radius={8}>
                          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
          ))}
            </Bar>
        
    
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
