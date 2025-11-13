'use client';

import {useState, useEffect, useMemo} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Slider} from '@/components/ui/slider';
import {Info} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const InfoTooltip = ({children}: {children: React.ReactNode}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-muted-foreground cursor-pointer ml-2" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{children}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function KwhCo2Calculator() {
  const [monthlyKwh, setMonthlyKwh] = useState(340);
  const [timeSpan, setTimeSpan] = useState(12);
  const [carbonIntensity, setCarbonIntensity] = useState(122);

  const [totalKwh, setTotalKwh] = useState(0);
  const [co2PerMonth, setCo2PerMonth] = useState(0);
  const [co2Total, setCo2Total] = useState(0);

  useEffect(() => {
    const total = monthlyKwh * timeSpan;
    const totalCo2 = (carbonIntensity * monthlyKwh * timeSpan) / 1000;
    const monthlyCo2 = totalCo2 / timeSpan;

    setTotalKwh(total);
    setCo2Total(totalCo2);
    setCo2PerMonth(monthlyCo2);
  }, [monthlyKwh, timeSpan, carbonIntensity]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-center">
          kWh to CO₂ Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="monthly-kwh">
                  Average Monthly kWh (kilowatt-hours)
                </Label>
                <InfoTooltip>
                  Your average electricity usage per month.
                </InfoTooltip>
              </div>
              <Input
                id="monthly-kwh"
                type="number"
                value={monthlyKwh}
                onChange={e => setMonthlyKwh(Number(e.target.value))}
              />
              <Slider
                value={[monthlyKwh]}
                onValueChange={([val]) => setMonthlyKwh(val)}
                max={2000}
                step={10}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="time-span">Time Span (Months)</Label>
                <InfoTooltip>
                  The period over which you want to calculate emissions.
                </InfoTooltip>
              </div>
              <Input
                id="time-span"
                type="number"
                value={timeSpan}
                onChange={e => setTimeSpan(Number(e.target.value))}
              />
              <Slider
                value={[timeSpan]}
                onValueChange={([val]) => setTimeSpan(val)}
                max={60}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="carbon-intensity">
                  Carbon Intensity (gCO₂/kWh)
                </Label>
                <InfoTooltip>
                  Grams of CO₂ equivalent per kWh. Varies by region.
                </InfoTooltip>
              </div>
              <Input
                id="carbon-intensity"
                type="number"
                value={carbonIntensity}
                onChange={e => setCarbonIntensity(Number(e.target.value))}
              />
              <Slider
                value={[carbonIntensity]}
                onValueChange={([val]) => setCarbonIntensity(val)}
                max={1000}
                step={1}
              />
            </div>
          </div>
          <div className="space-y-4">
            <Card className="bg-muted/50 text-center p-4">
              <p className="text-sm text-muted-foreground">Total kWh</p>
              <p className="text-3xl font-bold text-primary">
                {totalKwh.toFixed(2)}
              </p>
            </Card>
            <Card className="bg-muted/50 text-center p-4">
              <p className="text-sm text-muted-foreground">
                CO₂e (Kg) per Month
              </p>
              <p className="text-3xl font-bold text-primary">
                {co2PerMonth.toFixed(2)}
              </p>
            </Card>
            <Card className="bg-muted/50 text-center p-4">
              <p className="text-sm text-muted-foreground">
                CO₂e (Kg) Total For Time Span
              </p>
              <p className="text-3xl font-bold text-primary">
                {co2Total.toFixed(2)}
              </p>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
