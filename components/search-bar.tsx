"use client"

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { VerificationResultsCard } from '@/components/VerificationResultsCard';

interface VerificationResult {
  verdict: string;
  explanation: string;
  sources: string[];
  claim: string; // Added to hold the claim
}

export function SearchBar() {
  const [claim, setClaim] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [pastResults, setPastResults] = useState<VerificationResult[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) {
      toast({
        title: "Please enter a claim",
        description: "Enter a statement or claim you'd like to verify.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      setResult({ ...data, claim }); // Include the claim in the result
      setPastResults(prev => [{ ...data, claim }, ...prev]); // Store the new result in history
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "There was an error verifying your claim. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reverify = async () => {
    if (!result) return null;
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claim: result.claim }),
    });

    if (!response.ok) {
      throw new Error('Re-verification failed');
    }

    return await response.json();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex w-full max-w-2xl gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter a claim to verify..."
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            className="pl-9"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying
            </>
          ) : (
            'Verify'
          )}
        </Button>
      </form>

      {result && (
        <VerificationResultsCard 
          result={result} 
          onReverify={reverify} 
          pastResults={pastResults} 
        />
      )}
    </div>
  );
}