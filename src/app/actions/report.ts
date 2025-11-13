
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { CarbonReport } from "@/lib/types";

const ReportInputSchema = z.object({
  energyUsedKwh: z.number(),
  location: z.string(),
  userId: z.string(),
});

type ReportInput = z.infer<typeof ReportInputSchema>;

// Mock emission factors (kg CO2e per kWh)
const emissionFactors: { [key: string]: number } = {
  IN: 0.71, // India
  US: 0.37, // United States
  DE: 0.34, // Germany
};

// Mock solar potential
const solarPotentials: { [key: string]: string } = {
  IN: "High",
  US: "Medium",
  DE: "Low",
};

export async function createCarbonReport(
  input: ReportInput
): Promise<{ success: boolean; data?: { emissionKg: number, solarPotential: string }; error?: string }> {
  const validation = ReportInputSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: "Invalid input." };
  }

  const { energyUsedKwh, location, userId } = validation.data;

  try {
    // In a real app, you would call the Climatiq or Carbon Interface API here.
    // We'll simulate it using mock factors.
    const emissionFactor = emissionFactors[location] || 0.5;
    const emissionKg = energyUsedKwh * emissionFactor;
    const solarPotential = solarPotentials[location] || "Medium";

    const reportData: Omit<CarbonReport, "id" | "timestamp"> = {
      userId,
      location,
      energyUsedKwh,
      emissionKg,
      solarPotential,
    };
    
    // Add server timestamp when saving to Firestore
    await addDoc(collection(db, "users", userId, "reports"), {
      ...reportData,
      timestamp: serverTimestamp(),
    });

    return { success: true, data: { emissionKg, solarPotential } };
  } catch (error: any) {
    console.error("Error creating carbon report:", error);
    return { success: false, error: error.message || "An unknown error occurred." };
  }
}
