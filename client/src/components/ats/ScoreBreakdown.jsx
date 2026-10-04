/*
 * ScoreBreakdown.jsx
 * Shows how the ATS score was built: one bar per part of the formula
 * (hard skills 40, other keywords 20, sections 20, quality 10, alignment 10).
 */
function ScoreBreakdown({ breakdown }) {
  return (
    <dl className="w-full space-y-3">
      {breakdown.map((item) => {
        const percent = Math.round((item.points / item.maxPoints) * 100)
        const barColor = percent >= 75 ? 'bg-signal' : percent >= 50 ? 'bg-amber' : 'bg-maroon'
        return (
          <div key={item.label}>
            <div className="flex items-baseline justify-between text-[15px]">
              <dt className="font-semibold">{item.label}</dt>
              <dd className="tabular font-semibold">
                {item.points}
                <span className="text-ink-faint"> / {item.maxPoints}</span>
              </dd>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percent}%` }} />
            </div>
          </div>
        )
      })}
    </dl>
  )
}

export default ScoreBreakdown
