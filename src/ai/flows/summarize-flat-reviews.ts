'use server';

/**
 * @fileOverview A flow that summarizes reviews for a flat.
 *
 * - summarizeFlatReviews - A function that summarizes the reviews for a flat.
 * - SummarizeFlatReviewsInput - The input type for the summarizeFlatReviews function.
 * - SummarizeFlatReviewsOutput - The return type for the summarizeFlatReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFlatReviewsInputSchema = z.object({
  reviews: z
    .string()
    .describe('The reviews for the flat, as a single string.'),
});
export type SummarizeFlatReviewsInput = z.infer<typeof SummarizeFlatReviewsInputSchema>;

const SummarizeFlatReviewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the reviews.'),
});
export type SummarizeFlatReviewsOutput = z.infer<typeof SummarizeFlatReviewsOutputSchema>;

export async function summarizeFlatReviews(input: SummarizeFlatReviewsInput): Promise<SummarizeFlatReviewsOutput> {
  return summarizeFlatReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFlatReviewsPrompt',
  input: {schema: SummarizeFlatReviewsInputSchema},
  output: {schema: SummarizeFlatReviewsOutputSchema},
  prompt: `You are an AI assistant that summarizes reviews for a flat.

  Reviews: {{{reviews}}}

  Summary:`,
});

const summarizeFlatReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeFlatReviewsFlow',
    inputSchema: SummarizeFlatReviewsInputSchema,
    outputSchema: SummarizeFlatReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
