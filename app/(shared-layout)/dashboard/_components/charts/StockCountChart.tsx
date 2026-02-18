"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"


export const description = "A bar chart"



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function StockCountChart({ data }:
  { data: { name: string, count: number, reorderPoint: number }[]}
) {

  const lowStockItems = data.filter((item) => item.count < item.reorderPoint);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lowest stocked items</CardTitle>
        <CardDescription>{lowStockItems.length} stock items are below their reorder point</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              type="category"
              tickLine={false}
                tick={{ fontSize: 12 }}
     
            
              axisLine={false}
                   tickFormatter={(value) =>
    value.length > 10 ? value.slice(0, 10) + "…" : value
  }
      

            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="count" fill="#4ade80" radius={8}>
              {data.map((entry, index) => {

                let fill = "#86efac";

                if (entry.count <= entry.reorderPoint / 2){
                  fill = '#f87171'
                } else if (entry.count < entry.reorderPoint){
                  fill = "#fef08a"
                }
                
               


                return <Cell key={`cell-${index}`} fill={fill} />
              })}

            </Bar>

          </BarChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
