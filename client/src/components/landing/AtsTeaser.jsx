// Landing page section that previews the ATS checker.
import { Check } from 'lucide-react'
import ScoreCircle from '../ScoreCircle'
import KeywordChips from '../KeywordChips'

const SAMPLE_KEYWORDS = [
  { word: 'React', matched: true },
  { word: 'JavaScript', matched: true },
  { word: 'REST APIs', matched: true },
  { word: 'responsive', matched: true },
  { word: 'TypeScript', matched: false },
  { word: 'Jest', matched: false },
  { word: 'accessibility', matched: false },
]

const REPORT_ITEMS = ['A score out of 100 with how it was calculated', 'Matched and missing keywords from the job description', 'Section checks: contact details, summary, skills and more', 'Fixes ranked by impact, each linked to the right editor section']

function AtsTeaser() {
  return (
    <section aria-labelledby="ats-title" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
      <div>
        <h2 id="ats-title" className="font-board text-4xl leading-tight font-bold">
          Know your score before you apply
        </h2>
        <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-ink-soft">
          Paste the job description and check your resume the way an applicant tracking system would.
        </p>
        <ul className="mt-6 space-y-2.5">
          {REPORT_ITEMS.map((item) => (
            <li key={item} className="flex gap-2.5 text-[15px]">
              <Check size={18} className="mt-0.5 shrink-0 text-signal" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <figure className="rounded-lg border border-line bg-paper p-6 shadow-panel">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <ScoreCircle score={82} size={150} />
          <div>
            <h3 className="board-text text-[13px] text-ink-soft">Keywords from the job description</h3>
            <div className="mt-2">
              <KeywordChips keywords={SAMPLE_KEYWORDS} />
            </div>
          </div>
        </div>
        <figcaption className="mt-4 text-xs text-ink-faint">Sample report for a Frontend Developer resume.</figcaption>
      </figure>
    </section>
  )
}

export default AtsTeaser
