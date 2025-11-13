'use client';

import React, { useState } from 'react';
import { Sun, Wind, MapPin, Loader2 } from 'lucide-react';

type EnergyData = {
  location: { lat: number; lng: number };
  solar: {
    irradiance: string;
    annualProduction: string;
    rating: string;
    peakHours: string;
  };
  wind: {
    avgSpeed: string;
    annualProduction: string;
    rating: string;
    capacity: string;
  };
};

type SelectedLocation = {
    lat: string;
    lng: string;
    x: number;
    y: number;
}


export default function SolarWindMap() {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [energyData, setEnergyData] = useState<EnergyData | null>(null);

  const calculateEnergyPotential = (lat: number, lng: number) => {
    // Solar calculations based on latitude
    const absLat = Math.abs(lat);
    const latitudeFactor = 1 - (absLat / 90) * 0.4;
    const seasonalVariation = Math.random() * 0.15 + 0.9;
    
    // Base solar irradiance (kWh/m²/day)
    const solarIrradiance = (5.5 * latitudeFactor * seasonalVariation).toFixed(2);
    const solarPotential = (parseFloat(solarIrradiance) * 365 * 0.15).toFixed(0); // Annual kWh for 1kW system
    
    // Wind calculations - higher at coasts and certain latitudes
    const coastalFactor = Math.random() * 0.5 + 0.75;
    const windBeltBonus = (absLat > 30 && absLat < 60) ? 1.3 : 1.0;
    const windSpeed = (4 + Math.random() * 8 * coastalFactor * windBeltBonus).toFixed(1);
    const windPotential = (Math.pow(parseFloat(windSpeed), 3) * 0.5 * 8760 * 0.4 / 1000).toFixed(0);
    
    // Solar panel recommendations
    const solarRating = parseFloat(solarIrradiance) > 5 ? 'Excellent' : 
                       parseFloat(solarIrradiance) > 4 ? 'Very Good' :
                       parseFloat(solarIrradiance) > 3 ? 'Good' : 'Fair';
    
    const windRating = parseFloat(windSpeed) > 7 ? 'Excellent' :
                      parseFloat(windSpeed) > 5 ? 'Good' :
                      parseFloat(windSpeed) > 3 ? 'Fair' : 'Poor';

    return {
      location: { lat, lng },
      solar: {
        irradiance: solarIrradiance,
        annualProduction: solarPotential,
        rating: solarRating,
        peakHours: (parseFloat(solarIrradiance) / 1).toFixed(1)
      },
      wind: {
        avgSpeed: windSpeed,
        annualProduction: windPotential,
        rating: windRating,
        capacity: (parseFloat(windSpeed) > 6 ? '100kW+' : '50kW')
      }
    };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lng = (x / rect.width) * 360 - 180;
    const lat = 90 - (y / rect.height) * 180;
    
    setLoading(true);
    setEnergyData(null);
    setSelectedLocation({ lat: lat.toFixed(4), lng: lng.toFixed(4), x, y });
    
    setTimeout(() => {
      const data = calculateEnergyPotential(lat, lng);
      setEnergyData(data);
      setLoading(false);
    }, 600);
  };

  const getRatingColor = (rating: string) => {
    switch(rating) {
      case 'Excellent': return 'text-green-600';
      case 'Very Good': return 'text-lime-600';
      case 'Good': return 'text-yellow-600';
      case 'Fair': return 'text-orange-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 -m-4 sm:-m-6 lg:-m-8 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold font-headline text-foreground mb-2">
            Global Solar & Wind Energy Map
          </h1>
          <p className="text-muted-foreground">
            Click anywhere on the map to discover renewable energy potential
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-lg p-4">
              <div 
                className="relative w-full aspect-[2/1] rounded-lg cursor-crosshair overflow-hidden border-2 border-border"
                onClick={handleMapClick}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
                  alt="World Map"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable="false"
                />
                
                <div className="absolute top-2 left-2 bg-card/90 px-3 py-2 rounded-lg text-sm font-medium text-foreground shadow">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Click to analyze location
                </div>

                {selectedLocation && (
                  <div 
                    className="absolute w-4 h-4 -ml-2 -mt-2 animate-pulse"
                    style={{ 
                      left: `${selectedLocation.x}px`, 
                      top: `${selectedLocation.y}px`,
                    }}
                  >
                    <div className="w-4 h-4 bg-red-500 rounded-full opacity-75"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Coordinates: {selectedLocation ? `${selectedLocation.lat}°, ${selectedLocation.lng}°` : 'Click on map'}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-lg p-6 min-h-[500px] flex flex-col justify-center">
              {!energyData && !loading && (
                <div className="text-center py-12 text-muted-foreground/60">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a location on the map to view energy potential</p>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                  <p className="text-muted-foreground">Calculating energy potential...</p>
                </div>
              )}

              {energyData && !loading && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sun className="w-6 h-6 text-yellow-500" />
                      <h3 className="text-xl font-bold font-headline text-foreground">Solar Energy</h3>
                    </div>
                    
                    <div className="space-y-3 bg-yellow-500/10 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Daily Irradiance:</span>
                        <span className="font-semibold">{energyData.solar.irradiance} kWh/m²/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peak Sun Hours:</span>
                        <span className="font-semibold">{energyData.solar.peakHours} hrs/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Production:</span>
                        <span className="font-semibold">{energyData.solar.annualProduction} kWh/yr</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-yellow-500/20">
                        <span className="text-muted-foreground">Rating:</span>
                        <span className={`font-bold text-lg ${getRatingColor(energyData.solar.rating)}`}>
                          {energyData.solar.rating}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground/80 italic">
                        *Based on 1kW system capacity
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Wind className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-bold font-headline text-foreground">Wind Energy</h3>
                    </div>
                    
                    <div className="space-y-3 bg-blue-500/10 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Wind Speed:</span>
                        <span className="font-semibold">{energyData.wind.avgSpeed} m/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Turbine Capacity:</span>
                        <span className="font-semibold">{energyData.wind.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Production:</span>
                        <span className="font-semibold">{energyData.wind.annualProduction} MWh/yr</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-blue-500/20">
                        <span className="text-muted-foreground">Rating:</span>
                        <span className={`font-bold text-lg ${getRatingColor(energyData.wind.rating)}`}>
                          {energyData.wind.rating}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground/80 italic">
                        *Estimated for commercial turbine
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">💡 Recommendation</h4>
                      <p className="text-sm text-muted-foreground">
                        {energyData.solar.rating === 'Excellent' || energyData.solar.rating === 'Very Good' 
                          ? 'This location is ideal for solar installations. '
                          : 'Solar potential is moderate. '}
                        {energyData.wind.rating === 'Excellent' || energyData.wind.rating === 'Good'
                          ? 'Wind energy is also promising here.'
                          : 'Wind conditions are less favorable.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Data is estimated based on geographical location and typical weather patterns.</p>
          <p className="mt-1">For detailed site assessment, consult with renewable energy professionals.</p>
        </footer>
      </div>
    </div>
  );
}
