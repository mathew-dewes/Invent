"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type Props = {
  data:{
  costCentreName: string | null,
  _sum: number,
  }[],

  totalSpend: number
}

export function TopSpendingCostCentresChart({data, totalSpend}:Props
) {

  
  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>Top Spending Cost Centres</CardTitle>
        <CardDescription>
          <div>
            <p>Total cost centre spend for {new Date().toLocaleString("en-NZ",{
          month: "long"
        })} </p>
          </div>
         </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 md:h-90 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="costCentreName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
          
            />
            <ChartTooltip
             formatter={(value) => "Spend " +
    new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(Number(value))
  }
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="_sum" fill="#4ade80" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) =>
    new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
      maximumFractionDigits: 0,
    }).format(value)
  }
                
                
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total monthly spend: {convertToMoney(totalSpend)}
        </div>
     
      </CardFooter>
    </Card>
  )
}
