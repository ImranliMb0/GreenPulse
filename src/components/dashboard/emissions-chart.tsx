"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


const data = [
  { month: "Jan", emissions: 186 },
  { month: "Feb", emissions: 305 },
  { month: "Mar", emissions: 237 },
  { month: "Apr", emissions: 273 },
  { month: "May", emissions: 209 },
  { month: "Jun", emissions: 214 },
]

const chartConfig = {
  emissions: {
    label: "tCO₂e",
    color: "hsl(var(--primary))",
  },
}

export function EmissionsChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline">Carbon Emissions Overview</CardTitle>
            <CardDescription>Your monthly emissions in tCO₂e for the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={data} accessibilityLayer>
                  <XAxis
                  dataKey="month"
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
                  tickFormatter={(value) => `${value}`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: "hsl(var(--muted))" }}
                  />
                  <Bar dataKey="emissions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}
