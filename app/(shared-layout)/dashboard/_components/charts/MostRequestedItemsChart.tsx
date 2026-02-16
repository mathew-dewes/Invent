"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

export const description = "A bar chart with a custom label"


const chartConfig = {
  requests: {
    label: "Units",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function MostRequestedItemsChart({data, issuedStock}:
  {data: {stock: string, requests: number}[], issuedStock: number}
) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly issued stock</CardTitle>
        <CardDescription>Showing issued stock items for the past 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-90 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 30,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="stock"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="requests" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="requests"
              layout="vertical"
              fill="#86efac"
              radius={4}
              barSize={45}
            >
              <LabelList
                dataKey="stock"
                position="insideLeft"
                offset={6}
                   className="fill-secondary font-medium text-xs md:text-sm w-200"
                fontSize={12}
              />
              <LabelList
                dataKey="requests"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
            <CardFooter >
           <div className="leading-none font-medium text-sm">
                Total monthly issued stock: {issuedStock}
              </div>
          </CardFooter>
    </Card>
  )
}
