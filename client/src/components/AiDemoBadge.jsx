// Small "Demo mode" tag shown on every AI button.
export const AI_DEMO_TOOLTIP = 'Rule-based for the demo. Real AI arrives in Phase 3.'

function AiDemoBadge({ className = '' }) {
  return (
    <span title={AI_DEMO_TOOLTIP} className={`rounded-[3px] bg-board px-1 py-px text-[10px] leading-tight font-bold tracking-wide text-ink uppercase ${className}`}>
      Demo mode
    </span>
  )
}

export default AiDemoBadge
