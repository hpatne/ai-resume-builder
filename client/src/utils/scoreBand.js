// Score colour: green 75+, amber 50-74, red below 50.
export function getScoreBand(score) {
  if (score >= 75) return { label: 'Strong match', tone: 'signal', color: 'var(--color-signal)' }
  if (score >= 50) return { label: 'Needs work', tone: 'amber', color: 'var(--color-amber)' }
  return { label: 'Weak match', tone: 'maroon', color: 'var(--color-maroon)' }
}
