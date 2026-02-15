"use client"

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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"



const chartConfig = {
  pending: {
    label: "Pending",
    color: "#fef08a",
  },
  ready: {
    label: "Ready",
    color: "#60a5fa",
  },
  complete: {
    label: "Complete",
    color: "#86efac",
  },
} satisfies ChartConfig;

type Props = {
  data: {date: string, complete: number, ready: number, pending: number}[],
  statusCount:{PENDING: number, READY: number, COMPLETE: number}
}

export function StackedRequestChart({data, statusCount}:Props) {


  return (
    <Card>
      <CardHeader>
        <CardTitle>Request overview</CardTitle>
        <CardDescription>
          Showing pending, ready and completed requests within the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
               tickMargin={8}
              minTickGap={32}
                  tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-NZ", {
                day: "2-digit",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
                labelFormatter={(value) => {
    const date = new Date(value)
    return date.toLocaleDateString("en-NZ", {
      day: "2-digit",
      month: "short", // e.g., "Feb"
      year: "numeric",
    })
  }}
            />
              <Area
              dataKey="pending"
              type="natural"
                fill="var(--color-pending)"
              fillOpacity={0.4}
               stroke="var(--color-pending)"
              stackId="a"
            />
                <Area
              dataKey="ready"
              type="natural"
               fill="var(--color-ready)"
              fillOpacity={0.4}
               stroke="var(--color-ready"
              stackId="b"
            />
            <Area
              dataKey="complete"
              type="natural"
              fill="var(--color-complete)"
              fillOpacity={0.4}
               stroke="var(--color-complete)"
              stackId="c"
            />
        
          
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm flex flex-col gap-1">
          <p><span className="font-semibold">Completed:</span> {statusCount.COMPLETE}</p>
          <p><span className="font-semibold">Pending:</span> {statusCount.PENDING}</p>
          <p><span className="font-semibold">Ready:</span> {statusCount.READY}</p>
        </div>
  
      </CardFooter>
    </Card>
  )
}
