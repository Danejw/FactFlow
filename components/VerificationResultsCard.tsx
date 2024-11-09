"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'; // Assuming you have a carousel component

interface VerificationResult {
  verdict: string;
  explanation: string;
  sources: string[];
  claim: string; // Added to hold the claim
}

interface VerificationResultsCardProps {
  result: VerificationResult;
  onReverify: () => Promise<VerificationResult | null>;
  pastResults: VerificationResult[];
}

export function VerificationResultsCard({ result, onReverify, pastResults }: VerificationResultsCardProps) {
  const [isRechecking, setIsRechecking] = useState(false);
  const [newResults, setNewResults] = useState<VerificationResult[]>([result]); // Start with the initial result
  const [checkMarks, setCheckMarks] = useState<string>(''); // To hold the tally of check marks or X marks
  const [emoji, setEmoji] = useState<string>(''); // State for the emoji

  const handleReverify = async () => {
    setIsRechecking(true);
    const updatedResult = await onReverify();
    if (updatedResult) {
      setNewResults(prev => [{ ...updatedResult, claim: result.claim }, ...prev]); // Ensure the claim is included
      // Update the tally based on the new result
      setCheckMarks(prev => prev + (updatedResult.verdict === 'TRUE' ? '✔️' : '❌'));

      // Set emoji based on the verdict
      if (updatedResult.verdict !== 'TRUE' && updatedResult.verdict !== 'FALSE') {
        setEmoji('🤔');
      } else {
        setEmoji('');
      }
    }
    setIsRechecking(false);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict?.toUpperCase()) {
      case 'TRUE':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'FALSE':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'PARTIALLY TRUE':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <Carousel>
        <CarouselContent>
          {newResults.map((res, index) => (
            <CarouselItem key={index}>
              <Card className="w-full shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Verification Result
                    <Badge variant="secondary" className={getVerdictColor(res.verdict)}>
                      {res.verdict}
                    </Badge>
                    {emoji && <span className="text-xl">{emoji}</span>} {/* Display emoji if applicable */}
                  </CardTitle>
                  <CardDescription>
                    <p>Claim: {res.claim}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {res.explanation}
                  </p>
                  {res.sources && res.sources.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Sources:</h4>
                      <ul className="text-sm text-muted-foreground list-disc pl-4">
                        {res.sources.map((source, index) => (
                          <li key={index}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <div className="flex justify-between items-center p-4">
                  {checkMarks && (
                    <div className="text-lg font-semibold">
                      <p>{checkMarks}</p>
                    </div>
                  )}
                  <Button onClick={handleReverify} disabled={isRechecking} className="bg-blue-600 text-white">
                    {isRechecking ? 'Rechecking...' : 'Double-Check'}
                  </Button>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 