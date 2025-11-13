import { SummaryCard } from "@/components/dashboard/summary-card";
import { BarChart, Droplets, Sun, Wind } from "lucide-react";
import { EmissionsChart } from "@/components/dashboard/emissions-chart";
import { RenewableProgressChart } from "@/components/dashboard/renewable-progress-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Emissions"
          value="1,234 tCO₂e"
          icon={<Droplets className="h-4 w-4 text-muted-foreground" />}
          change="+12.5%"
          changeType="increase"
          description="since last month"
        />
        <SummaryCard
          title="Renewable Adoption"
          value="42%"
          icon={<Sun className="h-4 w-4 text-muted-foreground" />}
          change="+5.2%"
          changeType="decrease"
          description="since last month"
        />
        <SummaryCard
          title="Solar Potential"
          value="High"
          icon={<Sun className="h-4 w-4 text-muted-foreground" />}
          description="in your region"
        />
        <SummaryCard
          title="Wind Potential"
          value="Medium"
          icon={<Wind className="h-4 w-4 text-muted-foreground" />}
          description="in your region"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <EmissionsChart />
        <RenewableProgressChart />
      </div>
    </div>
  );
}
