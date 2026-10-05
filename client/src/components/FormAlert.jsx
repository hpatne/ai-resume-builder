// Red error box shown above a form when submitting fails.
import { CircleAlert } from 'lucide-react'

function FormAlert({ message }) {
  if (!message) return null
  return (
    <div role="alert" className="mb-5 flex gap-2.5 rounded-md border border-maroon/30 bg-maroon-soft px-3.5 py-3 text-[15px] font-medium text-maroon">
      <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default FormAlert
