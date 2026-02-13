"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { convertToMoney, getNZDateKey } from "@/lib/helpers"


const chartConfig = {
  spend: {
    label: "Spend",
  },

} satisfies ChartConfig

export function TotalSpendChart({data}:
  {data:{date: string, spend: number}[]}
) {
  const [timeRange, setTimeRange] = React.useState("30d");


    const today = getNZDateKey(new Date());

  const filteredData = data.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = today;
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  });

  const totalSpend = filteredData.reduce((acc, i) => acc + i.spend, 0)

  function timeFrameLabel(){
    if (timeRange == "30d"){
      return "30 days"
    } else if (timeRange == "90d") {
      return "3 months"
    } else {
      return "7 days"
    }
  }
  



  return (
    <Card className="mt-3">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Total Daily Spend</CardTitle>
          <CardDescription>
            Within the last {timeFrameLabel()}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-60 md:h-90 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#38bdf8"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#38bdf8"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#38bdf8"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#38bdf8"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
 
            <Area
              dataKey="spend"
              type="natural"
              fill="#4ade80"
              stroke="#4ade80"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
              <CardFooter >
       <div className="leading-none  text-sm">
        <p className="font-medium"> Total spend: {convertToMoney(totalSpend) }</p>
        <p className="mt-2 text-muted-foreground">Within the last {timeFrameLabel()}</p>
          </div>
      </CardFooter>
    </Card>
  )
}
