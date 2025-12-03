'use server';
/**
 * @fileOverview A flow that automatically summarizes data in the Silver layer using a free LLM.
 *
 * - summarizeSilverData - A function that handles the summarization process.
 * - SummarizeSilverDataInput - The input type for the summarizeSilverData function.
 * - SummarizeSilverDataOutput - The return type for the summarizeSilverData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSilverDataInputSchema = z.object({
  data: z.string().describe('The curated data from the Silver layer to summarize.'),
});
export type SummarizeSilverDataInput = z.infer<typeof SummarizeSilverDataInputSchema>;

const SummarizeSilverDataOutputSchema = z.object({
  summary: z.string().describe('The summary of the Silver layer data.'),
});
export type SummarizeSilverDataOutput = z.infer<typeof SummarizeSilverDataOutputSchema>;

export async function summarizeSilverData(input: SummarizeSilverDataInput): Promise<SummarizeSilverDataOutput> {
  return summarizeSilverDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSilverDataPrompt',
  input: {schema: SummarizeSilverDataInputSchema},
  output: {schema: SummarizeSilverDataOutputSchema},
  prompt: `You are a data scientist tasked with summarizing curated data from the Silver layer of a data lake.
  Your goal is to identify key trends and anomalies in the data to provide a quick overview for analysis.

  Data: {{{data}}}

  Summary:`,
});

const summarizeSilverDataFlow = ai.defineFlow(
  {
    name: 'summarizeSilverDataFlow',
    inputSchema: SummarizeSilverDataInputSchema,
    outputSchema: SummarizeSilverDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
