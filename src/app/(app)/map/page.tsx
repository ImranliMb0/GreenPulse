import { GeoMapPlaceholder } from "@/components/map/geo-map-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

export default function MapPage() {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <GeoMapPlaceholder />
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Filter & Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Filter by Region</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="north">North India</SelectItem>
                                    <SelectItem value="south">South India</SelectItem>
                                    <SelectItem value="east">East India</SelectItem>
                                    <SelectItem value="west">West India</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Filter by State</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dl">Delhi</SelectItem>
                                    <SelectItem value="mh">Maharashtra</SelectItem>
                                    <SelectItem value="ka">Karnataka</SelectItem>
                                    <SelectItem value="tn">Tamil Nadu</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-lg font-headline">Top 3 Renewable-Ready Cities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center">1. Jaisalmer, Rajasthan (Solar)</li>
                                    <li className="flex items-center">2. Kanyakumari, Tamil Nadu (Wind)</li>
                                    <li className="flex items-center">3. Anantapur, Andhra Pradesh (Solar & Wind)</li>
                                </ul>
                            </CardContent>
                        </Card>
                        
                        <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Export Insights
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
