"use client"

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { OpenAI } from 'openai';
import { VerificationResultsCard } from '@/components/VerificationResultsCard'; // Import the VerificationResultsCard

export function LiveMonitor() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [claims, setClaims] = useState<{ text: string; verified: boolean }[]>([])
  const [verificationResults, setVerificationResults] = useState<any[]>([]); // State to hold verification results
  const { toast } = useToast()
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
            setClaims(prev => [...prev, { text: transcript, verified: false }]);
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + ' ' + finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        toast({
          title: "Error",
          description: "There was an error with the speech recognition. Please try again.",
          variant: "destructive",
        })
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const analyzeClaim = async (text: string) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const audioFile = new Blob([/* audio data */]); // Replace with actual audio data

    try {
      const response = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: audioFile,
        response_format: "text"
      });

      const transcript = response.text; // Extract the transcript
      const extractedClaims = extractClaims(transcript); // Function to extract claims from the transcript
      setClaims(prev => [...prev, ...extractedClaims]); // Update claims state with extracted claims

    } catch (error) {
      console.error('Transcription error:', error);
    }
  };

  const extractClaims = (transcript: string) => {
    return transcript.split('.').map(claim => ({ text: claim.trim(), verified: false })).filter(claim => claim.text);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      toast({
        title: "Monitoring stopped",
        description: "Live fact-checking has been stopped.",
      })
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      toast({
        title: "Monitoring started",
        description: "Live fact-checking is now active.",
      })
    }
  }

  const handleVerifyClaim = async (claimText: string) => {
    console.log(`Verifying claim: ${claimText}`);
    
    // Call the verification API
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please verify this claim: "${claimText}"`
          }
        ],
        temperature: 0.1,
      });

      const result = response.choices[0].message.content;
      const parsedResult = JSON.parse(result); // Assuming the response is in JSON format
      setVerificationResults(prev => [parsedResult, ...prev]); // Add the result to the verification results state at the top

      // Update the claim's verification status
      setClaims(prev => prev.map(claim => 
        claim.text === claimText ? { ...claim, verified: true } : claim
      ));
      
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Verification Error",
        description: "There was an error verifying the claim. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          className="gap-2"
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4" />
              Stop Monitoring
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Start Monitoring
            </>
          )}
        </Button>
        {isListening && (
          <Badge variant="secondary" className="animate-pulse">
            Live
          </Badge>
        )}
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Live Transcript</h3>
        <ScrollArea className="h-[100px] rounded-md border p-2">
          <p className="text-sm text-muted-foreground">{transcript || "Transcript will appear here..."}</p>
        </ScrollArea>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Fact-Check Results</h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-3">
            {claims.map((claim, index) => (
              <Card key={index} className="p-3">
                <p className="text-sm mb-2">{claim.text}</p>
                <div className="flex items-center gap-2">
                  <Button onClick={() => handleVerifyClaim(claim.text)} disabled={claim.verified} className="bg-blue-600 text-white">
                    {claim.verified ? 'Verified' : 'Verify Claim'}
                  </Button>
                  {!claim.verified && (
                    <Badge variant="secondary" className="gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Checking
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Render Verification Results */}
      {verificationResults.length > 0 && (
        <div className="space-y-4">
          {verificationResults.map((result, index) => (
            <VerificationResultsCard key={index} result={result} onReverify={() => handleVerifyClaim(result.claim)} pastResults={verificationResults} />
          ))}
        </div>
      )}
    </div>
  )
}