// Page title, short description and action buttons.
function PageHeader({ title, description, actions }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-board text-[32px] leading-tight font-bold text-ink">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  )
}

export default PageHeader
