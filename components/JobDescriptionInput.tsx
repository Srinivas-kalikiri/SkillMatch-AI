interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div>
      <label htmlFor="job-description" className="block text-sm font-medium text-slate-700 mb-2">
        Job Description
      </label>
      <textarea
        id="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        placeholder="Paste the job description here..."
        className="w-full border border-slate-300 rounded-lg p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
