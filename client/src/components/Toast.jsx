// Shows the pop-up notifications in the corner.
import { CircleCheck, CircleAlert, Info, X } from 'lucide-react'

const TYPE_ICONS = {
  success: <CircleCheck size={18} className="text-[#7fd6a2]" aria-hidden="true" />,
  error: <CircleAlert size={18} className="text-[#ff9b8c]" aria-hidden="true" />,
  info: <Info size={18} className="text-board" aria-hidden="true" />,
}

function Toast({ toasts, onDismiss }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-3 bottom-3 z-[60] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.type === 'error' ? 'alert' : 'status'}
          className="animate-toast-in on-navy pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md bg-navy-deep px-4 py-3 text-[15px] text-white shadow-pop sm:w-auto sm:min-w-72"
        >
          <span className="mt-0.5">{TYPE_ICONS[toast.type] || TYPE_ICONS.info}</span>
          <p className="flex-1 leading-snug">{toast.message}</p>
          {toast.actionLabel && (
            <button
              type="button"
              onClick={() => {
                toast.onAction()
                onDismiss(toast.id)
              }}
              className="board-text rounded px-1.5 text-board hover:underline"
            >
              {toast.actionLabel}
            </button>
          )}
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="text-navy-ink hover:text-white"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
