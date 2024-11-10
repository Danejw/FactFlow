"use client"

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { VerificationResultsCard } from '@/components/VerificationResultsCard';

export function LiveMonitor() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [claims, setClaims] = useState<{ text: string; verified: boolean }[]>([])
  const [verificationResults, setVerificationResults] = useState<any[]>([]);
  const [extractedClaims, setExtractedClaims] = useState<string[]>([]); // State to hold claims extracted from the transcript
  const { toast } = useToast()
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const [audioSources, setAudioSources] = useState<MediaDeviceInfo[]>([]); // State to hold audio sources
  const [selectedSource, setSelectedSource] = useState<string>(''); // State to hold selected audio source
  const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]); // State to hold output devices
  const [selectedOutput, setSelectedOutput] = useState<string>(''); // State to hold selected output device
  const audioContextRef = useRef<AudioContext | null>(null); // Ref to hold the audio context
  const mediaStreamRef = useRef<MediaStream | null>(null); // Ref to hold the media stream

  useEffect(() => {
    // Fetch audio input devices
    const fetchAudioSources = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      setAudioSources(audioInputs);
      if (audioInputs.length > 0) {
        setSelectedSource(audioInputs[0].deviceId); // Set default to the first audio input
      }
    };

    // Fetch audio output devices
    const fetchOutputDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
      setOutputDevices(audioOutputs);
      if (audioOutputs.length > 0) {
        setSelectedOutput(audioOutputs[0].deviceId); // Set default to the first audio output
      }
    };

    fetchAudioSources();
    fetchOutputDevices();

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
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  }, [])

  const toggleListening = async () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      // Stop speech recognition and media stream
      recognitionRef.current.stop()
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsListening(false)
      toast({
        title: "Monitoring stopped",
        description: "Live fact-checking has been stopped.",
      })
    } else {
      try {
        // Get the selected audio input stream
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: selectedSource ? { exact: selectedSource } : undefined }
        });

        // Create an audio context
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
        
        // Connect the source to the output device
        const destination = audioContextRef.current.createMediaStreamDestination();
        source.connect(destination);
        
        // Set the output device
        const audioElement = new Audio();
        audioElement.srcObject = destination.stream;
        await audioElement.setSinkId(selectedOutput); // Set the output device
        audioElement.play();

        // Start speech recognition
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Monitoring started",
          description: "Live fact-checking is now active.",
        });
      } catch (error) {
        console.error('Error accessing audio devices:', error);
        toast({
          title: "Error",
          description: "Could not access audio devices. Please check your permissions.",
          variant: "destructive",
        });
      }
    }
  }

  const handleVerifyClaim = async (claimText: string) => {
    // Call the verification API with the claim
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claim: claimText }),
    });

    if (!response.ok) {
      toast({
        title: "Verification failed",
        description: "There was an error verifying the claim. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const result = await response.json();
    setVerificationResults(prev => [...prev, { ...result, claim: claimText }]); // Add the verification result to the state
  };

  const handleCaptureClaim = async () => {
    if (transcript.trim()) {
      // Call OpenAI API to extract claims from the transcript
      const response = await fetch('/api/extract-claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcript.trim() }),
      });

      if (!response.ok) {
        toast({
          title: "Error extracting claims",
          description: "Failed to extract claims from the transcript.",
          variant: "destructive",
        });
        return;
      }

      const data = await response.json();
      console.log("Extracted Claims:", data.claims); // Debugging line to check claims
      setExtractedClaims(data.claims); // Set the extracted claims

      // Optionally, you can also verify the first claim immediately
      if (data.claims.length > 0) {
        handleVerifyClaim(data.claims[0]); // Verify the first extracted claim
      }

      setTranscript(""); // Clear the transcript after capturing
    } else {
      toast({
        title: "No transcript available",
        description: "Please speak something to capture a claim.",
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

      {/* Audio Source Selection */}
      <div className="flex items-center">
        <label htmlFor="audio-source" className="mr-2">Select Audio Source:</label>
        <select
          id="audio-source"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="border rounded p-2"
        >
          {audioSources.map(source => (
            <option key={source.deviceId} value={source.deviceId}>
              {source.label || `Microphone ${source.deviceId}`}
            </option>
          ))}
          <option value="system-audio">System Audio</option>
        </select>
      </div>

      {/* Output Device Selection */}
      <div className="flex items-center">
        <label htmlFor="output-device" className="mr-2">Select Output Device:</label>
        <select
          id="output-device"
          value={selectedOutput}
          onChange={(e) => setSelectedOutput(e.target.value)}
          className="border rounded p-2"
        >
          {outputDevices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Output ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Live Transcript</h3>
        <ScrollArea className="h-[100px] rounded-md border p-2">
          <p className="text-sm text-muted-foreground">{transcript || "Transcript will appear here..."}</p>
        </ScrollArea>
        <Button onClick={handleCaptureClaim} className="mt-2">
          Verify Current Transcript
        </Button>
      </Card>

      {/* Display Extracted Claims */}
      {extractedClaims.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Extracted Claims</h3>
          <ul className="list-disc pl-5">
            {extractedClaims.map((claim, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {claim}
              </li>
            ))}
          </ul>
        </div>
      )}

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