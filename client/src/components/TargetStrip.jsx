// Yellow strip showing the target company and role.
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
        {/* key replays the flip animation when the target changes */}
        <div key={`${companyName}-${roleTitle}`} className="animate-board-flip flex min-w-0 basis-full flex-col gap-x-3 sm:flex-1 sm:basis-auto sm:flex-row sm:flex-wrap sm:items-baseline">
          {hasTarget ? (
            <>
              <span className="sr-only">Target company:</span>
              <span className={`board-text leading-tight break-words ${companySize}`}>{companyName || 'Any company'}</span>
              <span aria-hidden="true" className="hidden h-5 w-[3px] self-center bg-ink sm:block" />
              <span className="sr-only">Job role:</span>
              <span className={`font-board leading-tight font-semibold ${roleSize}`}>{roleTitle || 'Any role'}</span>
            </>
          ) : (
            <span className="board-text text-lg">Paste a job or type a job title</span>
          )}
        </div>
        {detail && <p className="text-sm font-semibold text-ink/80">{detail}</p>}
        {action}
      </div>
    </section>
  )
}

export default TargetStrip
