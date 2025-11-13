'use server';

/**
 * @fileOverview A flow to generate regional insights based on aggregated carbon emission reports and renewable energy data.
 *
 * - generateRegionalInsights - A function that generates regional insights.
 * - GenerateRegionalInsightsInput - The input type for the generateRegionalInsights function.
 * - GenerateRegionalInsightsOutput - The return type for the generateRegionalInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRegionalInsightsInputSchema = z.object({
  regionalData: z
    .string()
    .describe(
      'Aggregated carbon emission reports and renewable energy data for a specific region.'
    ),
  comparisonData: z
    .string()
    .describe(
      'Aggregated carbon emission reports and renewable energy data for comparison regions.'
    ),
});
export type GenerateRegionalInsightsInput = z.infer<typeof GenerateRegionalInsightsInputSchema>;

const GenerateRegionalInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights highlighting trends and opportunities.'),
});
export type GenerateRegionalInsightsOutput = z.infer<typeof GenerateRegionalInsightsOutputSchema>;

export async function generateRegionalInsights(
  input: GenerateRegionalInsightsInput
): Promise<GenerateRegionalInsightsOutput> {
  return generateRegionalInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRegionalInsightsPrompt',
  input: {schema: GenerateRegionalInsightsInputSchema},
  output: {schema: GenerateRegionalInsightsOutputSchema},
  prompt: `You are an AI assistant that analyzes regional carbon emission reports and renewable energy data to generate insights.

Analyze the provided regional data and comparison data, and provide insights highlighting trends and opportunities for improvement.

Regional Data: {{{regionalData}}}
Comparison Data: {{{comparisonData}}}

Insights:`,
});

const generateRegionalInsightsFlow = ai.defineFlow(
  {
    name: 'generateRegionalInsightsFlow',
    inputSchema: GenerateRegionalInsightsInputSchema,
    outputSchema: GenerateRegionalInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
