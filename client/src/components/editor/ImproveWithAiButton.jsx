// "Improve with AI" button with a loading state.
import { PenLine } from 'lucide-react'
import Spinner from '../Spinner'

function ImproveWithAiButton({ onClick, isLoading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-navy/30 bg-paper px-2.5 text-sm font-semibold text-navy hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? <Spinner size={14} label="Improving" /> : <PenLine size={15} aria-hidden="true" />}
      {isLoading ? 'Improving…' : 'Improve with AI'}
    </button>
  )
}

export default ImproveWithAiButton
