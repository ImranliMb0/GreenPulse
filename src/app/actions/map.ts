
"use server";

import { z } from "zod";

const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

type Coordinates = z.infer<typeof CoordinatesSchema>;

export async function getRenewablePotential(
  coords: Coordinates
): Promise<{ success: boolean; data?: any; error?: string }> {
  const validation = CoordinatesSchema.safeParse(coords);
  if (!validation.success) {
    return { success: false, error: "Invalid coordinates." };
  }

  const { latitude, longitude } = validation.data;

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=shortwave_radiation,wind_speed_10m&timezone=auto&forecast_days=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    
    const hourlyData = data.hourly;
    const solarData = hourlyData.shortwave_radiation;
    const windData = hourlyData.wind_speed_10m;

    if (!solarData || !windData || solarData.length === 0 || windData.length === 0) {
      return { success: false, error: "No hourly data available for this location." };
    }

    const avgSolar = solarData.reduce((a:number, b:number) => a + b, 0) / solarData.length;
    const avgWind = windData.reduce((a:number, b:number) => a + b, 0) / windData.length;
    
    // Heuristic for renewable index.
    // Normalized solar contribution (assuming max ~800 W/m^2 as excellent)
    // Normalized wind contribution (assuming max ~12 m/s as excellent)
    const solarFactor = avgSolar / 800;
    const windFactor = avgWind / 12;
    const renewableIndex = Math.min(100, Math.round(((solarFactor + windFactor) / 2) * 100));


    return { 
        success: true, 
        data: {
            avgSolar: avgSolar.toFixed(2),
            avgWind: avgWind.toFixed(2),
            renewableIndex,
            units: {
                solar: data.hourly_units.shortwave_radiation,
                wind: data.hourly_units.wind_speed_10m,
            }
        } 
    };
  } catch (error: any) {
    console.error("Error fetching renewable potential:", error);
    return { success: false, error: error.message || "An unknown error occurred." };
  }
}
