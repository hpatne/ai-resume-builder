// Loading screen while the AI writes the resume.
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import Spinner from '../Spinner'

function GeneratingState({ steps }) {
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedCount((count) => Math.min(count + 1, steps.length - 1))
    }, 480)
    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <div role="status" aria-live="polite" className="rounded-lg border border-line bg-paper px-6 py-10 sm:px-10">
      <h2 className="font-board text-3xl font-bold">Writing your tailored draft</h2>
      <ul className="mt-6 space-y-3">
        {steps.map((step, index) => {
          if (index > completedCount) return null
          const isDone = index < completedCount
          return (
            <li key={step} className="flex items-center gap-3 text-[16px]">
              {isDone ? (
                <span className="grid size-6 place-items-center rounded-full bg-signal text-white">
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                </span>
              ) : (
                <span className="grid size-6 place-items-center text-navy"><Spinner size={20} label="Working" /></span>
              )}
              <span className={isDone ? 'text-ink-soft' : 'font-semibold'}>{step}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GeneratingState
