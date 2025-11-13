"use client"

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import type { CarbonReport } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

export function ReportsTable() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [reports, setReports] = useState<CarbonReport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        const reportsRef = collection(db, "users", user.uid, "reports");
        const q = query(reportsRef, orderBy("timestamp", "desc"));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userReports: CarbonReport[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                userReports.push({ 
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp, // Keep as Timestamp for sorting
                 } as CarbonReport);
            });
            setReports(userReports);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching reports: ", error);
            toast({
                variant: "destructive",
                title: "Failed to fetch reports",
                description: "There was an issue loading your past reports."
            });
            setLoading(false);
        });

        return () => unsubscribe();

    }, [user, toast]);
    
    const exportToCSV = () => {
        if (reports.length === 0) {
            toast({ title: "No data to export." });
            return;
        }

        const headers = ["Date", "Location", "Energy Used (kWh)", "Emissions (kg CO₂e)"];
        const rows = reports.map(report => [
            format((report.timestamp as Timestamp).toDate(), "yyyy-MM-dd HH:mm"),
            report.location,
            report.energyUsedKwh,
            report.emissionKg.toFixed(2),
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(e => e.join(",")).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "carbon_reports.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">Emission History</CardTitle>
                    <CardDescription>A log of your generated carbon emission reports.</CardDescription>
                </div>
                <Button onClick={exportToCSV} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Energy (kWh)</TableHead>
                                <TableHead className="text-right">Emissions (kg CO₂e)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                                    </TableCell>
                                </TableRow>
                            ) : reports.length > 0 ? (
                                reports.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell>{format((report.timestamp as Timestamp).toDate(), "PPp")}</TableCell>
                                        <TableCell>{report.location}</TableCell>
                                        <TableCell className="text-right">{report.energyUsedKwh}</TableCell>
                                        <TableCell className="text-right font-medium">{report.emissionKg.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No reports found. Generate one above to get started.
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
