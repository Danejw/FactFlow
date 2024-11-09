import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data?.claim?.trim()) {
      return NextResponse.json(
        { error: 'Claim is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a fact-checking assistant. Analyze the given claim and provide:
          1. A clear verdict (TRUE, FALSE, or PARTIALLY TRUE)
          2. A detailed explanation with evidence
          3. Sources or references where possible
          Format the response in JSON with the following structure:
          {
            "verdict": string,
            "explanation": string,
            "sources": string[]
          }`
        },
        {
          role: "user",
          content: `Please verify this claim: "${data.claim}"`
        }
      ],
      temperature: 0.1, // Lower temperature for more focused, factual responses
    });

    const result = completion.choices[0].message.content;
    
    try {
      // Parse the JSON response
      const parsedResult = JSON.parse(result || '{}');
      return NextResponse.json(parsedResult);
    } catch (e) {
      // Fallback in case the response isn't proper JSON
      return NextResponse.json({
        verdict: "ERROR",
        explanation: "Failed to analyze the claim. Please try again.",
        sources: []
      });
    }

  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to verify claim' 
      },
      { status: 500 }
    );
  }
} 