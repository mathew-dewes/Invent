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
import { convertToMoney } from "@/lib/helpers"


export const description = "A bar chart with a custom label"



const chartConfig = {
  count: {
    label: "Quantity",
    color: "var(--chart-2)",
  },

} satisfies ChartConfig

export function StockCountChart({data, stockCount, stockValue}:
  {data: {name: string, count: number}[], stockCount: number, stockValue: number}
) {


  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels</CardTitle>
        <CardDescription>Total units: {stockCount}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-90 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 25,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="#4ade80"
              radius={4}
              barSize={45}
              
              
              
            >
   
        
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={6}
                className="fill-secondary font-medium text-xs md:text-sm w-200"
                fontSize={12}
              />
              <LabelList
              max={1}
                dataKey="count"
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
            Stock value: {convertToMoney(stockValue)}
          </div>
      </CardFooter>
      
      
    </Card>
  )
}
