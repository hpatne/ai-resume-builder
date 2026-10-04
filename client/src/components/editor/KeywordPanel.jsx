/*
 * KeywordPanel.jsx
 * Suggested keywords for the resume's target company + role (D6). Each
 * keyword is checked against the resume text on every change:
 *   green = already used, maroon = missing.
 * Missing role skills can be added to the Skills section with one click.
 */
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getTargetKeywords } from '../../utils/targetProfile'
import { resumeToText, containsKeyword } from '../../utils/keywordUtils'
import KeywordChips from '../KeywordChips'

function KeywordPanel({ company, role, resumeData, onAddSkill }) {
  const [isOpen, setIsOpen] = useState(true)

  // Check every target keyword against the current resume text
  const resumeText = resumeToText(resumeData)
  const keywords = getTargetKeywords(company, role).map((keyword) => ({ ...keyword, matched: containsKeyword(resumeText, keyword.word) }))
  const skillKeywords = keywords.filter((keyword) => keyword.type === 'skill')
  const otherKeywords = keywords.filter((keyword) => keyword.type === 'keyword')
  const usedCount = keywords.filter((keyword) => keyword.matched).length
  const coveragePercent = keywords.length ? Math.round((usedCount / keywords.length) * 100) : 0

  return (
    <section aria-label="Keywords for this target" className="overflow-hidden rounded-lg border border-line bg-paper">
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <span className="board-text rounded-[3px] bg-board px-1.5 py-0.5 text-[13px]">Keywords</span>
        <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">
          {company.name} · {role.title}
        </span>
        <span className="tabular text-sm font-semibold text-ink-soft">
          {usedCount} of {keywords.length} used
        </span>
        <ChevronDown size={18} aria-hidden="true" className={`shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
      </button>

      {/* Coverage bar */}
      <div className="mx-4 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full rounded-full bg-signal transition-[width] duration-500" style={{ width: `${coveragePercent}%` }} />
      </div>

      {isOpen && (
        <div className="space-y-4 px-4 pt-3 pb-4">
          <div>
            <h3 className="mb-1.5 text-sm font-semibold text-ink-soft">Role skills: click a missing one to add it to Skills</h3>
            <KeywordChips keywords={skillKeywords} onAdd={onAddSkill} />
          </div>
          {otherKeywords.length > 0 && (
            <div>
              <h3 className="mb-1.5 text-sm font-semibold text-ink-soft">Use these words in your summary or bullet points</h3>
              <KeywordChips keywords={otherKeywords} />
            </div>
          )}
        </div>
      )}
      {!isOpen && <div className="h-3" />}
    </section>
  )
}

export default KeywordPanel
