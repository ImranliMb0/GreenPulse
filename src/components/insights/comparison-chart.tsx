"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { state: "Tamil Nadu", reduction: 15, adoption: 22 },
  { state: "Delhi", reduction: 12, adoption: 18 },
  { state: "Gujarat", reduction: 18, adoption: 25 },
  { state: "Rajasthan", reduction: 20, adoption: 28 },
  { state: "Karnataka", reduction: 14, adoption: 20 },
  { state: "National Avg.", reduction: 10, adoption: 15 },
];

const chartConfig = {
  reduction: {
    label: "Emission Reduction",
    color: "hsl(var(--primary))",
  },
  adoption: {
    label: "Renewable Adoption",
    color: "hsl(var(--accent))",
  },
}

export function ComparisonChart() {
  return (
    <div className="h-[350px]">
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <BarChart data={data} accessibilityLayer>
            <XAxis
              dataKey="state"
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
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Bar dataKey="reduction" name="Emission Reduction" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="adoption" name="Renewable Adoption" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
