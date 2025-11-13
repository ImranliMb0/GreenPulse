
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { getRenewablePotential } from "@/app/actions/map";
import { Loader2, Sun, Wind, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PotentialData = {
    avgSolar: number;
    avgWind: number;
    renewableIndex: number;
    units: {
        solar: string;
        wind: string;
    }
}

export function GeoMap() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');
  const [loading, setLoading] = useState(false);
  const [potential, setPotential] = useState<PotentialData | null>(null);
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null);
  const { toast } = useToast();

  const handleMapClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Dummy conversion of pixel coordinates to lat/lng
    const latitude = 90 - (y / rect.height) * 180;
    const longitude = (x / rect.width) * 360 - 180;

    setLoading(true);
    setPotential(null);
    setClickPosition({ x, y });

    try {
        const result = await getRenewablePotential({ latitude, longitude });
        if (result.success && result.data) {
            setPotential(result.data);
        } else {
            throw new Error(result.error || "Failed to fetch data.");
        }
    } catch(e: any) {
        toast({
            variant: "destructive",
            title: "Could not fetch renewable potential",
            description: e.message
        });
    } finally {
        setLoading(false);
    }
  };

  const getPotentialLabel = (index: number) => {
      if (index > 66) return 'High';
      if (index > 33) return 'Medium';
      return 'Low';
  }
  
  const getPotentialColor = (index: number) => {
      if (index > 66) return 'text-green-500';
      if (index > 33) return 'text-yellow-600';
      return 'text-red-500';
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Renewable Energy Potential</CardTitle>
        <CardDescription>Click on the map to get solar and wind energy potential for any location.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border cursor-pointer" onClick={handleMapClick}>
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              data-ai-hint={mapImage.imageHint}
              fill
              className="object-cover"
            />
          )}
          {clickPosition && (
            <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${clickPosition.x}px`, top: `${clickPosition.y}px` }}
            >
                {loading ? (
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                ) : potential ? (
                    <div className="p-2 bg-card rounded-lg shadow-lg border text-sm w-48">
                        <h4 className="font-bold mb-2 font-headline flex items-center gap-2">
                           <Gauge className="w-4 h-4"/> Renewable Index
                        </h4>
                        <div className="text-center mb-2">
                            <span className={`text-2xl font-bold ${getPotentialColor(potential.renewableIndex)}`}>
                                {potential.renewableIndex}
                            </span>
                            <span className="text-xs text-muted-foreground"> / 100</span>
                        </div>
                        <div className="text-xs space-y-1 text-muted-foreground">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <Sun className="w-3 h-3 text-yellow-500" />
                                    <span>Solar:</span>
                                </div>
                                <span>{potential.avgSolar} {potential.units.solar}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <Wind className="w-3 h-3 text-blue-500" />
                                    <span>Wind:</span>
                                </div>
                                <span>{potential.avgWind} {potential.units.wind}</span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>High Potential</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium Potential</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Low Potential</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

