/*
 * NotFoundPage.jsx  (route: any unknown URL)
 * Shown when the URL does not match any page.
 */
import Button from '../components/Button'

function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <div className="w-full rounded-md border-[3px] border-ink bg-board px-5 py-4">
        <p className="board-text text-5xl leading-none">404</p>
        <p className="font-board mt-1 text-xl font-semibold">Page not found</p>
      </div>
      <h1 className="mt-8 text-2xl font-bold">This page isn’t on our route map</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
        The link may be old or mistyped. Go back to the home page or open your dashboard.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button to="/">Go to home page</Button>
        <Button to="/dashboard" variant="secondary">Open dashboard</Button>
      </div>
    </section>
  )
}

export default NotFoundPage
