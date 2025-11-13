"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Loader2, Calculator } from "lucide-react"
import { createCarbonReport } from "@/app/actions/report"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

const formSchema = z.object({
  energyUsedKwh: z.coerce.number().min(1, "Energy usage must be greater than 0."),
  location: z.string().min(2, "Location is required."),
})

export function ReportForm() {
  const { toast } = useToast()
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [reportResult, setReportResult] = useState<{ emissionKg: number, solarPotential: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      energyUsedKwh: '' as any, // Initialize with an empty string
      location: "IN", // Default to India
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to create a report.",
        });
        return;
    }
    
    setIsLoading(true);
    setReportResult(null);
    try {
      const result = await createCarbonReport({ ...values, userId: user.uid });
      if (result.success && result.data) {
        setReportResult(result.data);
        toast({
          title: "Report Generated Successfully",
          description: `Your estimated emission is ${result.data.emissionKg.toFixed(2)} kg CO₂e.`,
        });
        form.reset();
      } else {
        throw new Error(result.error || "Failed to generate report.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="energyUsedKwh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Electricity Consumption (kWh)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 350" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Calculator className="mr-2 h-4 w-4" />
            )}
            Calculate Emissions
          </Button>
        </form>
      </Form>
      <div>
        <Card className="h-full flex flex-col justify-center items-center bg-muted/30 text-center">
            <CardHeader>
                <CardTitle className="font-headline">Your Results</CardTitle>
                <CardDescription>Calculated emissions will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center">
                {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : reportResult ? (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Est. Carbon Emissions</p>
                            <p className="text-4xl font-bold font-headline text-primary">
                                {reportResult.emissionKg.toFixed(2)}
                                <span className="text-lg font-medium text-foreground ml-1">kg CO₂e</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Regional Solar Potential</p>
                            <p className="text-2xl font-semibold text-foreground">
                                {reportResult.solarPotential}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-muted-foreground">Awaiting calculation...</p>
                )}
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">Calculations are estimates based on regional grid data.</p>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}
