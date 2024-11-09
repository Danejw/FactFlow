"use client"

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VerificationResult {
  verdict: string;
  explanation: string;
  sources: string[];
}

export function SearchBar() {
  const [claim, setClaim] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!claim.trim()) {
      toast({
        title: "Please enter a claim",
        description: "Enter a statement or claim you'd like to verify.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim }),
      })

      if (!response.ok) {
        throw new Error('Verification failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "There was an error verifying your claim. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
  }

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
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Verification Result
              <Badge variant="secondary" className={getVerdictColor(result.verdict)}>
                {result.verdict}
              </Badge>
            </CardTitle>
            <CardDescription>
              Here's what our AI found about your claim
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {result.explanation}
            </p>
            {result.sources && result.sources.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Sources:</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-4">
                  {result.sources.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}