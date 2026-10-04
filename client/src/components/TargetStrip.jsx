/*
 * TargetStrip.jsx
 * The app's signature element: a yellow "station board" naming the TARGET
 * COMPANY and JOB ROLE. It stays visible on the wizard, editor and ATS checker,
 * so the user (and the reviewer) can always see what the resume is tailored to.
 * When the target changes, the text flips in like a departure board updating.
 */
function TargetStrip({ companyName, roleTitle, detail, action, size = 'md' }) {
  const companySize = size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-2xl'
  const roleSize = size === 'lg' ? 'text-xl sm:text-2xl' : 'text-lg'
  const hasTarget = Boolean(companyName || roleTitle)

  return (
    <section
      aria-label="Target company and role"
      className="overflow-hidden rounded-md border-[3px] border-ink bg-board text-ink shadow-panel"
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5">
        {/* `key` makes React re-mount this block when the target changes, replaying the flip */}
        <div key={`${companyName}-${roleTitle}`} className="animate-board-flip flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3">
          {hasTarget ? (
            <>
              <span className="sr-only">Target company:</span>
              <span className={`board-text leading-tight break-words ${companySize}`}>{companyName || 'Any company'}</span>
              <span aria-hidden="true" className="h-5 w-[3px] self-center bg-ink" />
              <span className="sr-only">Job role:</span>
              <span className={`font-board leading-tight font-semibold ${roleSize}`}>{roleTitle || 'Any role'}</span>
            </>
          ) : (
            <span className="board-text text-lg">Choose a target company and role</span>
          )}
        </div>
        {detail && <p className="text-sm font-semibold text-ink/80">{detail}</p>}
        {action}
      </div>
    </section>
  )
}

export default TargetStrip
