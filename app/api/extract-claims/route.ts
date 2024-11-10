import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data?.transcript?.trim()) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a claim extraction assistant. Given the following transcript, extract a list of claims that can be verified:
          Transcript: "${data.transcript}"`
        }
      ],
      temperature: 0.1,
    });

    const result = completion.choices[0].message.content;

    try {
      const parsedResult = JSON.parse(result || '{}');
      return NextResponse.json({ claims: parsedResult.claims || [] });
    } catch (e) {
      return NextResponse.json({
        claims: [],
        error: "Failed to parse claims."
      });
    }

  } catch (error: any) {
    console.error('Claim extraction error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to extract claims' 
      },
      { status: 500 }
    );
  }
} 