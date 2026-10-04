/*
 * KeywordChips.jsx
 * Shows a list of keywords as chips. Matched keywords are green with a tick,
 * missing ones are maroon. If `onAdd` is given, missing chips become buttons
 * that add the keyword to the resume.
 * Used by: editor keyword panel, ATS checker results, wizard company insight, landing demo.
 */
import { Check, Plus, X } from 'lucide-react'

function KeywordChips({ keywords, onAdd }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {keywords.map(({ word, matched }) => {
        const chipClasses = matched
          ? 'border-signal/30 bg-signal-soft text-signal'
          : 'border-maroon/25 bg-maroon-soft text-maroon'
        const icon = matched ? <Check size={14} aria-hidden="true" /> : onAdd ? <Plus size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />

        return (
          <li key={word}>
            {!matched && onAdd ? (
              <button
                type="button"
                onClick={() => onAdd(word)}
                className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-sm font-medium hover:border-maroon ${chipClasses}`}
                title={`Add "${word}" to skills`}
              >
                {icon}
                {word}
                <span className="sr-only"> (missing, add to skills)</span>
              </button>
            ) : (
              <span className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-sm font-medium ${chipClasses}`}>
                {icon}
                {word}
                <span className="sr-only">{matched ? ' (found in resume)' : ' (missing)'}</span>
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default KeywordChips
