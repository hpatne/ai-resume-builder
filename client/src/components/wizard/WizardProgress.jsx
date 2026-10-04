/*
 * WizardProgress.jsx
 * Step indicator for the create wizard: Target -> Template -> Details.
 * Finished steps show a tick; the current step is highlighted in yellow.
 */
import { Check } from 'lucide-react'

const STEP_NAMES = ['Target', 'Template', 'Details']

function WizardProgress({ currentStep }) {
  return (
    <ol className="mb-6 flex items-center gap-2 sm:gap-3" aria-label="Progress">
      {STEP_NAMES.map((name, index) => {
        const stepNumber = index + 1
        const isDone = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        return (
          <li key={name} className="flex items-center gap-2 sm:gap-3" aria-current={isCurrent ? 'step' : undefined}>
            <span
              className={`grid size-8 place-items-center rounded-full border-[3px] text-sm font-bold tabular ${
                isCurrent ? 'border-ink bg-board' : isDone ? 'border-navy bg-navy text-white' : 'border-line-strong bg-paper text-ink-faint'
              }`}
            >
              {isDone ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : stepNumber}
            </span>
            <span className={`board-text text-[15px] ${isCurrent ? 'text-ink' : 'text-ink-faint'}`}>
              {name}
              {isDone && <span className="sr-only"> (done)</span>}
            </span>
            {stepNumber < STEP_NAMES.length && <span aria-hidden="true" className="h-[3px] w-6 bg-line-strong sm:w-12" />}
          </li>
        )
      })}
    </ol>
  )
}

export default WizardProgress
