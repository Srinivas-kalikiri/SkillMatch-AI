import type { MatchResult } from '@/types';

interface MatchResultsProps {
  result: MatchResult;
}

export default function MatchResults({ result }: MatchResultsProps) {
  return (
    <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-bold text-indigo-600">{result.matchScore}%</div>
        <div className="text-slate-600">Match Score</div>
      </div>

      <p className="text-slate-700 mb-6">{result.summary}</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-green-700 mb-2">Matched Skills</h3>
          <ul className="space-y-1">
            {result.matchedSkills.map((skill) => (
              <li key={skill} className="text-sm text-slate-700 flex items-center gap-2">
                <span className="text-green-500">✓</span> {skill}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-amber-700 mb-2">Missing Skills</h3>
          <ul className="space-y-1">
            {result.missingSkills.map((skill) => (
              <li key={skill} className="text-sm text-slate-700 flex items-center gap-2">
                <span className="text-amber-500">×</span> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
