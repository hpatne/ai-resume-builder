/*
 * HeroDemo.jsx
 * Live demo on the landing page that proves our core idea in one glance:
 * pick a different target company + role and the template, section order,
 * draft content and keywords all change. It uses the same sample data and the
 * same draft builder as the real create wizard.
 */
import { useMemo, useState } from 'react'
import { useCatalog } from '../../context/CatalogContext'
import { buildResumeDraft } from '../../services/aiService'
import { resumeToText, containsKeyword } from '../../utils/keywordUtils'
import { getTargetKeywords } from '../../utils/targetProfile'
import { SECTION_LABELS } from '../../data/sections'
import TargetStrip from '../TargetStrip'
import ResumePreview from '../templates/ResumePreview'
import KeywordChips from '../KeywordChips'

// Three sample targets that look very different from each other
const DEMO_TARGETS = [
  { companyId: 'nimbus-labs', roleId: 'frontend-developer' },
  { companyId: 'corewave-it', roleId: 'software-engineer' },
  { companyId: 'ledgerline-capital', roleId: 'data-analyst' },
]

const DEMO_BASICS = {
  fullName: 'Aarav Sharma',
  email: 'aarav@example.com',
  phone: '+91 98200 12345',
  location: 'Mumbai',
  degree: 'B.E. in Computer Engineering',
  institution: 'Vidyanagar Institute of Technology',
  graduationYear: '2027',
  score: 'CGPA 8.6 / 10',
  experienceLevel: 'internship',
  lastCompany: 'Brightpath Software',
}

function HeroDemo() {
  const { companies, roles, templates } = useCatalog()
  const [activeIndex, setActiveIndex] = useState(0)

  // Only show targets whose company and role still exist (an admin may delete them)
  const availableTargets = useMemo(
    () =>
      DEMO_TARGETS.map((target) => ({
        company: companies.find((company) => company.id === target.companyId),
        role: roles.find((role) => role.id === target.roleId),
      })).filter((target) => target.company && target.role),
    [companies, roles]
  )

  const activeTarget = availableTargets[activeIndex] || availableTargets[0]

  // Build the draft for the selected target (re-built only when the target changes)
  const demo = useMemo(() => {
    if (!activeTarget) return null
    const { company, role } = activeTarget
    const template = templates.find((item) => item.id === company.preferredTemplate) || templates[0]
    const draft = buildResumeDraft({ basics: DEMO_BASICS, company, role, templateId: template?.id })
    const resumeText = resumeToText(draft)
    const keywords = getTargetKeywords(company, role)
      .filter((keyword) => keyword.type === 'keyword')
      .slice(0, 8)
      .map((keyword) => ({ word: keyword.word, matched: containsKeyword(resumeText, keyword.word) }))
    return { company, role, template, draft, keywords }
  }, [activeTarget, templates])

  if (!demo) {
    return <div className="h-[520px] animate-pulse rounded-lg border border-line bg-paper" aria-hidden="true" />
  }

  return (
    <div className="rounded-lg border border-line bg-paper p-3 shadow-panel sm:p-4">
      {/* Target switcher */}
      <div role="group" aria-label="Try a sample target" className="mb-3 flex flex-wrap gap-1.5">
        {availableTargets.map((target, index) => {
          const isActive = target === activeTarget
          return (
            <button
              key={target.company.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={`rounded border px-2.5 py-1.5 text-sm font-semibold transition-colors ${
                isActive ? 'border-ink bg-board text-ink' : 'border-line bg-ground text-ink-soft hover:border-ink-faint hover:text-ink'
              }`}
            >
              {target.company.name} · {target.role.title}
            </button>
          )
        })}
      </div>

      <TargetStrip
        companyName={demo.company.name}
        roleTitle={demo.role.title}
        detail={`${demo.company.type} · ${demo.template?.name} template`}
      />

      <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_190px]">
        {/* Resume preview, faded at the bottom */}
        <div className="relative max-h-[430px] overflow-hidden rounded bg-ground p-3">
          <ResumePreview key={demo.company.id} resume={demo.draft} layout={demo.template?.layout} maxScale={0.62} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ground to-transparent" />
        </div>

        {/* What changed for this target */}
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="board-text text-[13px] text-ink-soft">Section order</h3>
            <ol className="mt-1.5 space-y-0.5">
              {demo.draft.sectionOrder.map((sectionKey, index) => (
                <li key={sectionKey} className="flex gap-2">
                  <span className="tabular w-4 text-ink-faint">{index + 1}</span>
                  <span className="font-medium">{SECTION_LABELS[sectionKey]}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="board-text mb-1.5 text-[13px] text-ink-soft">Keywords it checks</h3>
            <KeywordChips keywords={demo.keywords} />
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink-faint">Sample data: these companies are fictional.</p>
    </div>
  )
}

export default HeroDemo
