import type { Timestamp } from 'firebase/firestore';

export type CarbonReport = {
  id: string;
  location: string;
  energyUsedKwh: number;
  emissionKg: number;
  solarPotential: number | string;
  timestamp: Timestamp | Date;
  userId: string;
};
