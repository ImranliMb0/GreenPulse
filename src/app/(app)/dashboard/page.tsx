import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copy } from "lucide-react";
import Link from "next/link";

const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="text-center">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline tracking-tight">Welcome Back</h2>
      </div>

      <Card>
        <CardContent className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden sm:inline">New API Key:</span>
            <div className="flex items-center gap-2 font-code p-2 border rounded-md bg-muted/50">
              <span>87d8b5523a104cd7a7493046251311</span>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            LIVETRIAL Ends on 27/Nov/2025
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Plan" value="Pro Plus" />
        <SummaryCard title="Calls per Month" value="5,000,000" />
        <SummaryCard title="Calls Made" value="0" />
        <SummaryCard title="Trial End Date" value="27/Nov/25" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Get Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Learn how to form HTTP request to get weather from{' '}
            <Link href="#" className="text-primary hover:underline">API Explorer</Link> or use our NEW{' '}
            <Link href="#" className="text-primary hover:underline">Swagger Tool</Link>.
          </p>
          <p>
            Complete{' '}
            <Link href="#" className="text-primary hover:underline">weather API documentation</Link>.
          </p>
          <p>
            <Link href="#" className="text-primary hover:underline">Weather icons and weather lookup code list</Link>.
          </p>
          <p>
            Want to choose which weather field to return in the API response? Change it from{' '}
            <Link href="#" className="text-primary hover:underline">API response fields</Link>.
          </p>
          <p>
            Looking to upgrade/downgrade your API plan? Visit our{' '}
            <Link href="/accounts/plan" className="text-primary hover:underline">Upgrade/Downgrade plan section</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
