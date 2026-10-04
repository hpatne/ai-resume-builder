/*
 * PageLoader.jsx
 * Centred spinner with a short message, shown while a page's data loads.
 */
import Spinner from './Spinner'

function PageLoader({ message = 'Loading…' }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-ink-soft">
      <Spinner size={28} label={message} />
      <p className="text-[15px]">{message}</p>
    </div>
  )
}

export default PageLoader
