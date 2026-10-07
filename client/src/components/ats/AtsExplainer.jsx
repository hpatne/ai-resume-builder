// "How this score works" box: the scoring rules in plain words.
import { Info } from 'lucide-react'

const RULES = [
  { points: 50, title: 'Skills from the job', text: 'We find the skills the job description asks for (using a list of about 130 skills and short forms like JS = JavaScript) and check how many appear anywhere in your resume.' },
  { points: 10, title: 'Job title', text: 'Your summary or experience should mention the job title, for example “Frontend Developer”.' },
  { points: 20, title: 'Sections', text: '4 points each for contact details, summary, skills, projects or experience, and education.' },
  { points: 20, title: 'Bullet quality', text: 'Bullet points with numbers (8), bullet points that start with an action verb like Built or Improved (8), and a summary of 40–80 words (4).' },
]

function AtsExplainer() {
  return (
    <section className="rounded-lg border border-line bg-paper p-5">
      <h2 className="mb-3 text-xl font-bold">How this score works</h2>
      <ul className="space-y-3">
        {RULES.map((rule) => (
          <li key={rule.title} className="flex gap-3 text-[15px]">
            <span className="tabular grid h-7 w-12 shrink-0 place-items-center rounded bg-ground text-sm font-bold">{rule.points}</span>
            <p className="leading-relaxed">
              <span className="font-semibold">{rule.title}: </span>
              {rule.text}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-ink-soft">Without a job description, only sections and bullet quality are checked, and the result is shown out of 100.</p>
      <p className="mt-4 flex gap-2 rounded-md border border-amber/30 bg-amber-soft px-3 py-2.5 text-sm leading-relaxed">
        <Info size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
        <span>This is an estimate like Jobscan; real ATS systems differ. Don't add skills you don't have.</span>
      </p>
    </section>
  )
}

export default AtsExplainer
