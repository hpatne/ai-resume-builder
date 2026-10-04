/*
 * ScoreCircle.jsx
 * Circular progress ring showing the ATS score out of 100.
 * How the ring works: the coloured circle has a dashed stroke as long as the
 * whole circumference; shifting the dash by (100 - score)% leaves exactly
 * score% of the ring visible. A CSS animation sweeps it in from zero.
 * Used by: ATS Checker page.
 */
import { getScoreBand } from '../utils/scoreBand'

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ScoreCircle({ score, size = 200 }) {
  const band = getScoreBand(score)
  const dashOffset = CIRCUMFERENCE * (1 - score / 100)

  return (
    <figure className="flex flex-col items-center" aria-label={`ATS score ${score} out of 100, ${band.label}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
          {/* Grey track */}
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="var(--color-line)" strokeWidth="9" />
          {/* Coloured progress */}
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={band.color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="animate-ring-sweep"
            style={{ '--ring-from': CIRCUMFERENCE, '--ring-to': dashOffset }}
          />
        </svg>

        {/* The number itself: the biggest thing on the page */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-board tabular leading-none font-bold text-ink" style={{ fontSize: size * 0.36 }}>
            {score}
          </span>
          <span className="tabular text-sm font-semibold text-ink-faint">out of 100</span>
        </div>
      </div>
      <figcaption className="board-text mt-2 text-lg" style={{ color: band.color }}>
        {band.label}
      </figcaption>
    </figure>
  )
}

export default ScoreCircle
