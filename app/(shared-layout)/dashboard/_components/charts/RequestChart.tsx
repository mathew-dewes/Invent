"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
export const description = "A multiple bar chart"



const chartConfig = {
  placed: {
    label: "Placed",
    color: "var(--chart-1)",
  },
  complete: {
    label: "Complete",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function RequestChart({ data }:
  { data: { date: string, placed: number, complete: number }[] }
) {

 



  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
    <CardTitle className="uppercase">Placed vs. Complete</CardTitle>
        <CardDescription>Within the last 7 days</CardDescription>
        </div>

    
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
             <XAxis
                     dataKey="date"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     minTickGap={32}
                     tickFormatter={(value) => {
                       const date = new Date(value);                
                       return date.toLocaleDateString("en-NZ", {
                         month: "2-digit",
                         day: "2-digit",
                       })
                     }}
                   />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot"
                     labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-NZ", {
                      month: "short",
                      day: "numeric",
                    });
                  }} />}
            />
            <Bar dataKey="placed" fill="#60a5fa" radius={4} />
            <Bar dataKey="complete" fill="#4ade80" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
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




