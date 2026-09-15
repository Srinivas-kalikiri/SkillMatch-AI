interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeInput({ value, onChange }: ResumeInputProps) {
  return (
    <div>
      <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-2">
        Your Resume
      </label>
      <textarea
        id="resume"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        placeholder="Paste your resume text here..."
        className="w-full border border-slate-300 rounded-lg p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
