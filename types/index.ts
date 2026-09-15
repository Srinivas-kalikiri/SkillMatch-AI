export interface MatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  summary: string;
}

export interface AnalyzeRequestBody {
  resumeText: string;
  jobDescription: string;
}
