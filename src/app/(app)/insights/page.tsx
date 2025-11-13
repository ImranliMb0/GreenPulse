import { InsightsGenerator } from "@/components/insights/insights-generator";
import { ComparisonChart } from "@/components/insights/comparison-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InsightsPage() {
    return (
        <div className="space-y-8">
            <InsightsGenerator />
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">State-wise Carbon Performance</CardTitle>
                    <CardDescription>Comparison of carbon emissions reduction across different states.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ComparisonChart />
                </CardContent>
            </Card>
        </div>
    );
}
