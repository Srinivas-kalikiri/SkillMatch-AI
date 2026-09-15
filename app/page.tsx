'use client';

import { useState } from 'react';
import ResumeInput from '@/components/ResumeInput';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import MatchResults from '@/components/MatchResults';
import type { MatchResult } from '@/types';

export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setResult(data as MatchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  }

  const canAnalyze = resumeText.trim().length > 0 && jobDescription.trim().length > 0 && !loading;

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">SkillMatch AI</h1>
        <p className="text-slate-600 mb-8">
          Paste your resume and a job description to see how well they match.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <ResumeInput value={resumeText} onChange={setResumeText} />
          <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="mt-6 w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
        >
          {loading ? 'Analyzing...' : 'Analyze Match'}
        </button>

        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

        {result && <MatchResults result={result} />}
      </div>
    </main>
  );
}
