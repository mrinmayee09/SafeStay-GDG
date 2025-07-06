'use server';

/**
 * @fileOverview A flow that provides roommate recommendations based on compatibility.
 *
 * - matchRoommates - A function that finds the best roommates from a list of candidates for a seeker.
 * - MatchRoommatesInput - The input type for the matchRoommates function.
 * - MatchRoommatesOutput - The return type for the matchRoommates function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Roommate, RoommateSchema } from '@/lib/data';

export const MatchRoommatesInputSchema = z.object({
  seekerProfile: RoommateSchema.describe('The profile of the student looking for a roommate.'),
  candidates: z.array(RoommateSchema).describe('A list of potential roommate candidates.'),
});
export type MatchRoommatesInput = z.infer<typeof MatchRoommatesInputSchema>;

const RecommendedRoommateSchema = RoommateSchema.extend({
  matchScore: z.number().describe('A compatibility score from 0 to 100, where 100 is a perfect match.'),
  compatibilityReason: z.string().describe('A brief, one-sentence explanation for why this roommate is a good or bad match.'),
});
export type RecommendedRoommate = z.infer<typeof RecommendedRoommateSchema>;

export const MatchRoommatesOutputSchema = z.object({
  recommendations: z.array(RecommendedRoommateSchema).describe('A ranked list of recommended roommates, sorted from best to worst match.'),
});
export type MatchRoommatesOutput = z.infer<typeof MatchRoommatesOutputSchema>;


export async function matchRoommates(input: MatchRoommatesInput): Promise<MatchRoommatesOutput> {
  return matchRoommatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchRoommatesPrompt',
  input: { schema: MatchRoommatesInputSchema },
  output: { schema: MatchRoommatesOutputSchema },
  prompt: `You are an expert in social compatibility and roommate matching for college students. Your task is to find the best potential roommates for a student from a given list.

Analyze the Seeker Profile provided below and compare it against each person in the list of Candidates.

**Evaluation Criteria:**
- **Shared Hobbies:** Common interests are a strong indicator of compatibility.
- **Academic Alignment:** Similar branch or year of study can be beneficial but is less important than lifestyle.
- **Lifestyle & Personality:** This is the most important factor. Compare their personality (e.g., 'Early Bird' vs. 'Night Owl') and social habits (e.g., 'Enjoys hosting friends' vs. 'Prefers quiet nights'). A mismatch here can cause friction.

Based on your analysis, provide a compatibility score from 0 to 100 for each candidate, where 100 is a perfect match. Also, write a short, one-sentence reason explaining why they would or would not be a good match.

Return a ranked list of all candidates with their match score and reason, sorted from the highest score to the lowest.

**Seeker Profile:**
- Name: {{seekerProfile.name}}
- Year: {{seekerProfile.year}}
- Branch: {{seekerProfile.branch}}
- Hobbies: {{#each seekerProfile.hobbies}}"{{this}}" {{/each}}
- Personality: "{{seekerProfile.personality}}"
- Social Habits: "{{seekerProfile.socialHabits}}"

**Candidates:**
{{#each candidates}}
- Candidate {{this.id}}: {{this.name}}
  - Year: {{this.year}}
  - Branch: {{this.branch}}
  - Hobbies: {{#each this.hobbies}}"{{this}}" {{/each}}
  - Personality: "{{this.personality}}"
  - Social Habits: "{{this.socialHabits}}"
{{/each}}
`,
});

const matchRoommatesFlow = ai.defineFlow(
  {
    name: 'matchRoommatesFlow',
    inputSchema: MatchRoommatesInputSchema,
    outputSchema: MatchRoommatesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
