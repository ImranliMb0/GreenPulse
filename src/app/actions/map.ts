
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

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=shortwave_radiation,wind_speed_10m&forecast_days=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    
    // Simple aggregation: get the daily average
    const hourlyData = data.hourly;
    const avgSolar = hourlyData.shortwave_radiation.reduce((a:number, b:number) => a + b, 0) / hourlyData.shortwave_radiation.length;
    const avgWind = hourlyData.wind_speed_10m.reduce((a:number, b:number) => a + b, 0) / hourlyData.wind_speed_10m.length;

    return { 
        success: true, 
        data: { 
            solarPotential: avgSolar,
            windPotential: avgWind,
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
