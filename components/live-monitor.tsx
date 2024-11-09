"use client"

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

export function LiveMonitor() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [claims, setClaims] = useState<{ text: string; status: 'checking' | 'verified' | 'disputed'; sources?: string[] }[]>([])
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
            analyzeClaim(transcript)
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
    // Add the claim to the list immediately with "checking" status
    setClaims(prev => [...prev, { text, status: 'checking' }])

    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      setClaims(prev => prev.map(claim => 
        claim.text === text 
          ? {
              text,
              status: Math.random() > 0.5 ? 'verified' : 'disputed',
              sources: ['example.com/source1', 'example.com/source2']
            }
          : claim
      ))
    }, 2000)
  }

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
                  {claim.status === 'checking' ? (
                    <Badge variant="secondary" className="gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Checking
                    </Badge>
                  ) : claim.status === 'verified' ? (
                    <Badge variant="success" className="bg-green-500">Verified</Badge>
                  ) : (
                    <Badge variant="destructive">Disputed</Badge>
                  )}
                  {claim.sources && (
                    <span className="text-xs text-muted-foreground">
                      Sources: {claim.sources.join(', ')}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}