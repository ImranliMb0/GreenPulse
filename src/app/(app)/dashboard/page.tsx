import { SummaryCard } from "@/components/dashboard/summary-card";
import { EmissionsChart } from "@/components/dashboard/emissions-chart";
import { RenewableProgressChart } from "@/components/dashboard/renewable-progress-chart";
import { Leaf, Zap, BarChart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your GreenPulse dashboard.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Emissions Reduced"
          value="1,250 tCO₂e"
          icon={<Leaf className="text-green-500" />}
          change="12%"
          changeType="decrease"
          description="vs. last month"
        />
        <SummaryCard
          title="Renewable Energy Generated"
          value="8,500 MWh"
          icon={<Zap className="text-yellow-500" />}
          change="8%"
          changeType="increase"
          description="vs. last month"
        />
        <SummaryCard
          title="Regional Carbon Intensity"
          value="0.45 kgCO₂e/kWh"
          icon={<BarChart className="text-red-500" />}
          change="2%"
          changeType="increase"
          description="vs. last month"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <EmissionsChart />
        <RenewableProgressChart />
      </div>
    </div>
  );
}
