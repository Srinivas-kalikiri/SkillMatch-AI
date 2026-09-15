import { NextRequest, NextResponse } from 'next/server';
import type { AnalyzeRequestBody, MatchResult } from '@/types';

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function buildPrompt(resumeText: string, jobDescription: string): string {
  return `You are a resume-matching assistant. Compare the RESUME against the JOB DESCRIPTION and identify which required/preferred skills are present and which are missing.

Respond with ONLY valid JSON (no markdown fences, no extra text) in exactly this shape:
{
  "matchScore": <number 0-100>,
  "matchedSkills": [<string>, ...],
  "missingSkills": [<string>, ...],
  "summary": "<one or two sentence summary>"
}

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""`;
}

function parseModelJson(rawText: string): MatchResult {
  const cleaned = rawText.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  if (
    typeof parsed.matchScore !== 'number' ||
    !Array.isArray(parsed.matchedSkills) ||
    !Array.isArray(parsed.missingSkills) ||
    typeof parsed.summary !== 'string'
  ) {
    throw new Error('Model response did not match the expected shape.');
  }

  return parsed as MatchResult;
}

export async function POST(request: NextRequest) {
  let body: AnalyzeRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const { resumeText, jobDescription } = body;

  if (!resumeText?.trim() || !jobDescription?.trim()) {
    return NextResponse.json(
      { error: 'Both resumeText and jobDescription are required.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is missing GEMINI_API_KEY. Add it to your .env.local file.' },
      { status: 500 }
    );
  }

  try {
    const geminiResponse = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(resumeText, jobDescription) }] }],
        generationConfig: { temperature: 0.2 },
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      return NextResponse.json(
        { error: `Gemini API request failed: ${errText}` },
        { status: 502 }
      );
    }

    const data = await geminiResponse.json();
    const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    if (!rawText) {
      return NextResponse.json({ error: 'Gemini returned an empty response.' }, { status: 502 });
    }

    const result = parseModelJson(rawText);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Analyze route error:', err);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
