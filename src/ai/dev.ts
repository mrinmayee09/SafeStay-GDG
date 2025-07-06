'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-flat-reviews.ts';
import '@/ai/flows/match-roommates.ts';
