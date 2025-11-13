import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function GeoMapPlaceholder() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');

  const potentialPoints = [
    { top: '30%', left: '40%', color: 'bg-green-500', label: 'High' },
    { top: '50%', left: '60%', color: 'bg-yellow-500', label: 'Medium' },
    { top: '70%', left: '30%', color: 'bg-red-500', label: 'Low' },
    { top: '25%', left: '70%', color: 'bg-green-500', label: 'High' },
    { top: '60%', left: '80%', color: 'bg-yellow-500', label: 'Medium' },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Renewable Energy Potential</CardTitle>
        <CardDescription>Color-coded regions indicating solar and wind energy potential.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              data-ai-hint={mapImage.imageHint}
              fill
              className="object-cover"
            />
          )}
          {potentialPoints.map((point, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 rounded-full animate-pulse"
              style={{ top: point.top, left: point.left, backgroundColor: point.color.split('-')[1] }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs bg-card px-1 rounded">{point.label}</div>
            </div>
          ))}
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
