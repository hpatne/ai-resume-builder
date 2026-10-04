/*
 * TemplateCard.jsx
 * One template: live preview with sample content, name, description and what
 * it is best for. Used in two places:
 *   - Templates gallery: shows a "Use this template" link (`actionTo`)
 *   - Create wizard step 2: the whole card is a selectable option (`onSelect`)
 * `isRecommended` adds a stamp when the template suits the chosen company/role.
 */
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import ResumePreview from './templates/ResumePreview'
import StatusStamp from './StatusStamp'

function TemplateCard({ template, sampleResume, isRecommended, isSelected, onSelect, actionTo, roleTitles = [] }) {
  const borderClasses = isSelected ? 'border-ink ring-[3px] ring-board' : 'border-line'

  const preview = (
    <div className="relative h-64 overflow-hidden border-b border-line bg-ground px-5 pt-4">
      <ResumePreview resume={sampleResume} layout={template.layout} maxScale={0.42} />
      {isRecommended && (
        <StatusStamp tone="signal" className="absolute top-3 left-3 bg-paper">
          Recommended
        </StatusStamp>
      )}
      {isSelected && (
        <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full border-2 border-ink bg-board" aria-hidden="true">
          <Check size={18} strokeWidth={3} />
        </span>
      )}
    </div>
  )

  const details = (
    <div className="flex flex-1 flex-col p-4 text-left">
      <h3 className="text-lg font-bold">{template.name}</h3>
      <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{template.description}</p>
      <p className="mt-3 text-sm">
        <span className="text-ink-faint">Best for: </span>
        <span className="font-medium">{template.companyTypes.join(', ')}</span>
      </p>
      {roleTitles.length > 0 && (
        <p className="mt-1 text-sm">
          <span className="text-ink-faint">Roles: </span>
          <span className="font-medium">{roleTitles.join(', ')}</span>
        </p>
      )}
      {actionTo && (
        <div className="mt-auto pt-4">
          <Link to={actionTo} className="inline-flex h-10 w-full items-center justify-center rounded-md bg-navy px-4 text-[15px] font-semibold text-white hover:bg-navy-soft">
            Use this template
          </Link>
        </div>
      )}
    </div>
  )

  // Wizard: the card is one big radio-like button
  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(template.id)}
        aria-pressed={isSelected}
        className={`flex flex-col overflow-hidden rounded-lg border-2 bg-paper shadow-panel transition-shadow hover:shadow-pop ${borderClasses}`}
      >
        {preview}
        {details}
      </button>
    )
  }

  // Gallery: a card with a link button
  return (
    <article className={`flex flex-col overflow-hidden rounded-lg border bg-paper shadow-panel ${borderClasses}`}>
      {preview}
      {details}
    </article>
  )
}

export default TemplateCard
