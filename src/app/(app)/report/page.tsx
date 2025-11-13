
'use client';

import {KwhCo2Calculator} from '@/components/report/kwh-co2-calculator';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {carbonIntensityData} from '@/lib/carbon-intensity-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Separator} from '@/components/ui/separator';
import { ReportsTable } from '@/components/report/reports-table';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function ReportPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <KwhCo2Calculator />
      {user && <ReportsTable userId={user.uid} />}

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Carbon Intensity Reference Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">
                    Carbon Intensity (gCO₂e/kWh)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carbonIntensityData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell className="text-right">
                      {row.intensity.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Data Source: ourworldindata.org
          </p>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-3xl font-bold font-headline">How It Works</h2>
        <p className="text-muted-foreground">
          You know that electricity usage contributes to carbon emissions, but
          how much? With this calculator you can find out how much carbon
          emissions you&apos;re producing based on your building&apos;s
          electricity usage. This provides you with a reference point so that,
          if you implement a strategy to reduce your carbon footprint, you can
          track your success.
        </p>

        <h3 className="text-2xl font-bold font-headline pt-4">
          Formulas for kWh to CO2 Carbon Emissions
        </h3>

        <Card>
          <CardHeader>
            <CardTitle>Total kWh</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This simply calculates your total electricity usage over the span
              of the number of months you&apos;d like to consider. It does this
              by multiplying them together.
            </p>
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg text-center font-code">
              <p>Total kWh = Monthly kWh &times; Number of Months</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CO₂e (Kg) Total For Time Span</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This formula calculates your total CO₂ emissions in Kg over the
              course of the defined time span (in months). To do this, it
              multiplies relevant variables together (including carbon
              intensity), and divides the result by 1000 to convert from grams
              to kilograms. Carbon intensity, or average grams of CO₂ per kWh,
              varies depending on country. You can find the carbon intensity of
              your country by reviewing the reference chart on this page.
            </p>
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg text-center font-code">
              <p>
                Total CO₂e (Kg) = (Carbon Intensity &times; kWh/Month &times;
                Time Span) / 1000
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CO₂e (Kg) per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This formula calculates your average CO₂ emission per month.
            </p>
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg text-center font-code">
              <p>
                Monthly CO₂e (Kg) = Total CO₂e (Kg) For Time Span / Time Span
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-3xl font-bold font-headline">Coming Soon</h2>
        <p className="text-muted-foreground">
          A calculator that compares your building&apos;s CO₂ emissions based on
          whether your building distributes AC or DC power to DC devices.
          Distributing DC power to DC devices is more efficient than
          distributing AC to them. This is because distributing DC power to DC
          devices eliminates the need for inefficient AC to DC conversions.
        </p>
      </div>
    </div>
  );
}
