/*
 * StatusStamp.jsx
 * Small "rubber stamp" badge for a resume's state, e.g. DRAFT or ATS 82.
 * State is always stamped visibly, so nothing about a resume changes silently.
 * Used by: ResumeCard (dashboard), resume editor (unsaved changes), admin tables.
 */
const TONE_CLASSES = {
  neutral: 'border-ink-faint text-ink-soft',
  signal: 'border-signal text-signal',
  amber: 'border-amber text-amber',
  maroon: 'border-maroon text-maroon',
  navy: 'border-navy text-navy',
}

function StatusStamp({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`board-text tabular inline-flex items-center rounded-[3px] border-[3px] border-double px-1.5 py-px text-[13px] leading-tight ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export default StatusStamp
