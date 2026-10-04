/*
 * AtsResultPanel.jsx
 * The full ATS report: big score + how it was calculated, matched/missing
 * keywords, section checks and prioritised suggestions.
 */
import ScoreCircle from '../ScoreCircle'
import ScoreBreakdown from './ScoreBreakdown'
import KeywordResults from './KeywordResults'
import SectionChecks from './SectionChecks'
import SuggestionList from './SuggestionList'

function AtsResultPanel({ report, resumeId }) {
  const panelClasses = 'rounded-lg border border-line bg-paper p-5'

  return (
    <div className="space-y-4" aria-live="polite">
      <section aria-label="ATS score" className={`${panelClasses} flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8`}>
        <ScoreCircle score={report.score} size={190} />
        <ScoreBreakdown breakdown={report.breakdown} />
      </section>

      <section className={panelClasses}>
        <h2 className="mb-4 text-xl font-bold">Keywords from the job description</h2>
        <KeywordResults hardSkills={report.hardSkills} otherKeywords={report.otherKeywords} />
      </section>

      <section className={panelClasses}>
        <h2 className="mb-2 text-xl font-bold">Section checks</h2>
        <SectionChecks checks={report.sectionChecks} resumeId={resumeId} />
      </section>

      <section className={panelClasses}>
        <h2 className="mb-4 text-xl font-bold">What to fix first</h2>
        <SuggestionList suggestions={report.suggestions} resumeId={resumeId} />
      </section>
    </div>
  )
}

export default AtsResultPanel
