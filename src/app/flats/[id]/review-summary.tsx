'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeFlatReviews } from '@/ai/flows/summarize-flat-reviews';
import { type Review } from '@/lib/data';
import { Wand2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ReviewSummary({ reviews }: { reviews: Review[] }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const reviewText = reviews.map((r) => r.comment).join('\n\n');
      const result = await summarizeFlatReviews({ reviews: reviewText });
      setSummary(result.summary);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl">AI-Powered Review Summary</CardTitle>
            <Button onClick={handleGenerateSummary} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Summary
                    </>
                )}
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {summary && (
            <div className="prose prose-sm max-w-none text-foreground/80 bg-background/50 p-4 rounded-md">
                <p>{summary}</p>
            </div>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {!summary && !isLoading && !error && (
            <p className="text-muted-foreground text-sm">Click the button to generate a quick summary of what tenants are saying.</p>
        )}
      </CardContent>
    </Card>
  );
}
