/*
 * EmptyState.jsx
 * Friendly placeholder shown when a list has nothing in it yet
 * (no resumes, no search results, no ATS check run yet).
 */
function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-dashed border-line-strong bg-paper px-6 py-12 text-center">
      {icon && <div className="mb-4 grid size-12 place-items-center rounded-md bg-navy text-white">{icon}</div>}
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {description && <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-ink-soft">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default EmptyState
