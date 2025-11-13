import { ReportForm } from '@/components/report/report-form';
import { ReportsTable } from '@/components/report/reports-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ReportPage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Carbon Emission Report Generator</CardTitle>
                    <CardDescription>Enter your energy usage data to instantly calculate your carbon footprint.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReportForm />
                </CardContent>
            </Card>

            <Separator />
            
            <ReportsTable />
        </div>
    );
}
