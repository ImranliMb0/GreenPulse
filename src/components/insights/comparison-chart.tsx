"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { state: "Tamil Nadu", reduction: 15, adoption: 22 },
  { state: "Delhi", reduction: 12, adoption: 18 },
  { state: "Gujarat", reduction: 18, adoption: 25 },
  { state: "Rajasthan", reduction: 20, adoption: 28 },
  { state: "Karnataka", reduction: 14, adoption: 20 },
  { state: "National Avg.", reduction: 10, adoption: 15 },
];

export function ComparisonChart() {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
            <Tooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "hsl(var(--muted))" }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Bar dataKey="reduction" name="Emission Reduction" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="adoption" name="Renewable Adoption" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
