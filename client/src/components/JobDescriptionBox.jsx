// Big "Paste job description" box that shows the skills found in it as chips.
import { findSkillsInText } from '../utils/jobDescription'
import TextArea from './TextArea'

function JobDescriptionBox({ id = 'job-description', label = 'Paste job description', value, onChange, error, hint, rows = 9, optional = false }) {
  const skills = findSkillsInText(value)

  return (
    <div>
      <TextArea
        id={id}
        label={optional ? `${label} (optional)` : label}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Copy the full job post from Naukri, LinkedIn or the company website and paste it here…"
        error={error}
        hint={hint || `${value.trim().length} characters`}
      />

      {value.trim() && (
        <div className="mt-3" aria-live="polite">
          <p className="mb-1.5 text-sm font-semibold text-ink-soft">
            {skills.length ? `${skills.length} skills found in this job` : 'No known skills found yet. Paste the full job description.'}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <li key={skill} className="rounded border border-navy/25 bg-ground px-2 py-1 text-sm font-medium text-navy">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default JobDescriptionBox
