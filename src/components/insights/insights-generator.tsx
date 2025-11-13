"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Loader2 } from 'lucide-react';
import { generateRegionalInsights, GenerateRegionalInsightsOutput } from '@/ai/flows/generate-regional-insights';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export function InsightsGenerator() {
    const [region, setRegion] = useState('');
    const [insights, setInsights] = useState<GenerateRegionalInsightsOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerate = async () => {
        if (!region) {
            toast({
                variant: 'destructive',
                title: 'Please select a region.',
            });
            return;
        }

        setLoading(true);
        setInsights(null);

        // Mock data for the AI flow
        const regionalData = `Region: ${region}. Aggregated data shows a 15% increase in solar panel installations over the last quarter. Average household energy consumption is 350 kWh/month. Major industries: IT, textiles.`;
        const comparisonData = `National Average: 10% increase in solar installations. Average household consumption: 400 kWh/month. Comparison regions like 'West India' show a 20% increase due to new government subsidies.`;

        try {
            const result = await generateRegionalInsights({
                regionalData,
                comparisonData,
            });
            setInsights(result);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Failed to generate insights.',
                description: 'The AI model could not be reached. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">AI-Driven Local Insights</CardTitle>
                <CardDescription>
                    Select a region to generate AI-powered insights on renewable progress and carbon performance.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="w-full sm:w-auto flex-grow">
                        <Label htmlFor="region-select">Region</Label>
                        <Select onValueChange={setRegion} value={region}>
                            <SelectTrigger id="region-select">
                                <SelectValue placeholder="Select a region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="North India">North India</SelectItem>
                                <SelectItem value="South India">South India</SelectItem>
                                <SelectItem value="East India">East India</SelectItem>
                                <SelectItem value="West India">West India</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleGenerate} disabled={loading || !region} className="w-full sm:w-auto">
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Lightbulb className="mr-2 h-4 w-4" />
                        )}
                        Generate Insights
                    </Button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}

                {insights && (
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-semibold font-headline">Generated Insights for {region}</h3>
                        <Textarea
                            readOnly
                            value={insights.insights}
                            className="h-48 font-code bg-muted/50"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
