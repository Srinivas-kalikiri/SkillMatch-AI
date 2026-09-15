# SkillMatch AI

A small full-stack web app that compares a resume against a job description using AI, and shows a match score, matched skills, and missing skills — the kind of feature you'd find at the core of an AI resume/career platform.

## Why I built this

I wanted a beginner-friendly project that actually exercises the parts of a modern full-stack app most relevant to production work: a typed frontend, a backend API route, and an LLM call — end to end, not just a UI mockup.

## Features

- Paste a resume and a job description side by side
- Click **Analyze Match** to send both to the backend
- Backend calls the Gemini API and asks it to return structured JSON
- UI displays a match score (0–100%), matched skills, missing skills, and a short summary

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS
- **API:** Next.js Route Handler (`app/api/analyze/route.ts`) — acts as a small REST endpoint
- **AI:** Google Gemini API (`gemini-1.5-flash`) via a direct `fetch` call, no SDK dependency

## How it's structured

```
skillmatch-ai/
├── app/
│   ├── api/analyze/route.ts   # POST endpoint: validates input, calls Gemini, returns JSON
│   ├── layout.tsx             # root layout
│   ├── page.tsx                # main page — holds state, calls the API, renders results
│   └── globals.css
├── components/
│   ├── ResumeInput.tsx
│   ├── JobDescriptionInput.tsx
│   └── MatchResults.tsx
├── types/index.ts             # shared TypeScript types for the API contract
└── .env.local.example
```

The split mirrors a simple version of a layered backend: the route handler validates the request, calls out to an external service (Gemini), and shapes the response — similar in spirit to a Controller → Service pattern, just condensed into one file since the project is intentionally small.

## Running it locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

3. Copy the example env file and add your key:
   ```bash
   cp .env.local.example .env.local
   # then edit .env.local and paste in your key
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000), paste in a resume and a job description, and click **Analyze Match**.

## What I'd add next

- Persist past analyses (e.g. in MongoDB) so results aren't lost on refresh
- Support PDF/DOCX upload instead of paste-only
- Break the score down by category (skills, experience level, keywords)

## Notes

Verified locally: `npm run build` completes with no TypeScript errors, and the app was smoke-tested with `npm run dev` — including the API route's validation (empty input → 400) and missing-API-key handling (→ 500 with a clear message) before wiring up a real key.
