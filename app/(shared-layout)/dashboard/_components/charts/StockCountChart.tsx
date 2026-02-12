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
  count: {
    label: "Quantity",
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

export function StockCountChart({data}:
  {data: {name: string, count: number}[]}
) {

  


  



  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Levels</CardTitle>
        <CardDescription>Total assets: 120</CardDescription>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">

        <p className="font-semibold">Lorem ipsum dolor sit amet</p>
    
 
    
       
      </CardFooter>
    </Card>
  )
}
