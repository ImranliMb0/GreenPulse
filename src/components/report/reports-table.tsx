
'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCollection } from '@/hooks/use-collection';
import type { CarbonReport } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export function ReportsTable({ userId }: { userId: string }) {
  const reportsQuery = useMemo(() => {
    if (!userId) return null;
    return query(collection(db, 'users', userId, 'reports'), orderBy('timestamp', 'desc'));
  }, [userId]);

  const { data: reports, loading } = useCollection<CarbonReport>(reportsQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Carbon Emission Reports</CardTitle>
        <CardDescription>
          A real-time log of your generated carbon emission reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Energy Used (kWh)</TableHead>
                <TableHead className="text-right">Emissions (kg CO₂e)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  </TableCell>
                </TableRow>
              ) : reports && reports.length > 0 ? (
                reports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell>
                      {report.timestamp ? new Date(report.timestamp.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>{report.location}</TableCell>
                    <TableCell>{report.energyUsedKwh}</TableCell>
                    <TableCell className="text-right">{report.emissionKg.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No reports generated yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
