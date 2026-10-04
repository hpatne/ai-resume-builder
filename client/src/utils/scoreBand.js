/*
 * scoreBand.js
 * Turns an ATS score (0-100) into a label and colour tone, so every place that
 * shows a score (dashboard badge, score circle, admin table) uses the same bands.
 *   75-100 -> Strong match (green)
 *   50-74  -> Needs work   (amber)
 *   0-49   -> Weak match   (maroon)
 */
export function getScoreBand(score) {
  if (score >= 75) return { label: 'Strong match', tone: 'signal', color: 'var(--color-signal)' }
  if (score >= 50) return { label: 'Needs work', tone: 'amber', color: 'var(--color-amber)' }
  return { label: 'Weak match', tone: 'maroon', color: 'var(--color-maroon)' }
}
