/*
 * RouteSteps.jsx
 * "How it works" on the landing page, drawn as a route map: five stops from
 * entering the target to downloading the PDF. Horizontal on desktop,
 * vertical on phones. The first stop is yellow because the target comes first.
 */
const STEPS = [
  { title: 'Enter company + role', text: 'Type where you are applying. We load that company’s profile and the role’s skills.' },
  { title: 'Pick a template', text: 'Templates recommended for that company come first; every other template stays one click away.' },
  { title: 'AI writes the draft', text: 'Add your basic details and get a tailored first draft with the right keywords.' },
  { title: 'Edit and check ATS', text: 'Edit with live preview, improve sections with AI, and score it against the job description.' },
  { title: 'Download PDF', text: 'Download a clean, text-based PDF and apply.' },
]

function RouteSteps() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 id="how-title" className="font-board text-4xl leading-tight font-bold">
          How it works
        </h2>

        <ol className="relative mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
          {/* The route line: vertical on phones, horizontal on desktop */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[13px] w-[3px] bg-ink md:top-[13px] md:right-[10%] md:bottom-auto md:left-0 md:h-[3px] md:w-auto" />

          {STEPS.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 md:flex-col md:gap-3">
              <span
                aria-hidden="true"
                className={`relative z-10 grid size-[29px] shrink-0 place-items-center rounded-full border-[3px] border-ink text-sm font-bold tabular ${
                  index === 0 ? 'bg-board' : 'bg-paper'
                }`}
              >
                {index + 1}
              </span>
              <div>
                <h3 className="board-text text-lg leading-tight">{step.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default RouteSteps
