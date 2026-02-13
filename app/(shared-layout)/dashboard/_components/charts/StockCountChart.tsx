"use client"

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
import { convertToMoney } from "@/lib/helpers"

export const description = "A bar chart"



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function StockCountChart({ data }:
  { data: { name: string, count: number }[] }
) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lowest stocked items</CardTitle>
        <CardDescription>11 units are below their reorder point</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-60 w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
      

            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="count" fill="#4ade80" radius={8}>
              {data.map((entry, index) => {

                let fill = "#4ade80"
                if (entry.count > 20) fill = "#4ade80"
                else if (entry.count > 10) fill = "#fb923c"
                else fill = "#ef4444"


                return <Cell key={`cell-${index}`} fill={fill} />
              })}

            </Bar>

          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter >
        <div className="leading-none font-medium text-sm">
          Stock value: {convertToMoney(11)}
        </div>
      </CardFooter>
    </Card>
  )
}
