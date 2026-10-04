/*
 * Modal.jsx
 * Accessible pop-up dialog: dims the page, closes on Escape or backdrop click,
 * and moves keyboard focus into the dialog when it opens.
 * Used by: ConfirmDialog, admin add/edit forms.
 */
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

function Modal({ title, onClose, children, footer, size = 'md' }) {
  const dialogRef = useRef(null)
  // Keep the latest onClose in a ref, so the effect below runs only once
  // (parents often pass a new function on every render)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  // When opened: focus the dialog, close on Escape, and stop the page behind from scrolling
  useEffect(() => {
    dialogRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [])

  const widthClass = size === 'lg' ? 'max-w-2xl' : 'max-w-md'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-deep/55 p-0 sm:items-center sm:p-4">
      {/* Clicking the dark backdrop closes the dialog */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`relative flex max-h-[92dvh] w-full ${widthClass} flex-col rounded-t-lg bg-paper shadow-pop sm:rounded-lg`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h2 id="modal-title" className="text-lg font-bold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-9 place-items-center rounded text-ink-soft hover:bg-ink/5 hover:text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
        {footer && <footer className="flex justify-end gap-3 border-t border-line px-5 py-4">{footer}</footer>}
      </div>
    </div>
  )
}

export default Modal
