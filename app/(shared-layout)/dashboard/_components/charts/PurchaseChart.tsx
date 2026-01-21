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
import { PurchaseStatus } from "@/generated/prisma/enums"

export const description = "A bar chart"

const chartData = [
  { month: "OPEN", requests: 186 },
  { month: "PENDING", requests: 305 },
  { month: "READY", requests: 237 },
  { month: "COMPLETE", requests: 73 },

]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function getBarColor(status: PurchaseStatus) {
  switch (status) {
    case "RECEIVED":
      return "#86efac";   // green-500
    case "DELAYED":
      return "#fb923c";   // yellow-500
    case "PLACED":
      return "#fde047";   // red-500
    default:
      return "#fb923c";   // slate-400
  }
}


type Props = {
  chartData: { name: string, purchases: number, status: PurchaseStatus }[],
  activeRequestCount: number
}

export function PurchaseChart({ chartData, activeRequestCount }: Props) {


    const activeMessage = () =>{

    if (activeRequestCount > 0){
return `You have ${activeRequestCount} purchase(s) needing attention`
    } else{
      return 'You have no urgent purchases at this time. Well done'
    }

}
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active requests by status</CardTitle>
        <CardDescription>{activeMessage()}</CardDescription>
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
            <Bar dataKey="purchases" radius={8}>
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
