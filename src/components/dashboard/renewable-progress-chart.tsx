"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { year: "2019", adoption: 28 },
  { year: "2020", adoption: 32 },
  { year: "2021", adoption: 35 },
  { year: "2022", adoption: 38 },
  { year: "2023", adoption: 42 },
  { year: "2024", adoption: 45 },
]

const chartConfig = {
  adoption: {
    label: "Adoption %",
    color: "hsl(var(--primary))",
  },
}

export function RenewableProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Renewable Adoption Progress</CardTitle>
        <CardDescription>Percentage of renewable energy in the grid mix over the years.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }} accessibilityLayer>
             <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
             <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "hsl(var(--muted))" }}
            />
            <Line type="monotone" dataKey="adoption" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
