/*
 * TextArea.jsx
 * Labelled multi-line text field with optional hint and error message.
 * Used by: resume editor (summary, bullet points), ATS checker (job description),
 * admin forms.
 */
import { CircleAlert } from 'lucide-react'

function TextArea({ id, label, error, hint, required = false, rows = 4, className = '', ...rest }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={[
          'block w-full resize-y rounded-md border bg-paper px-3 py-2 text-[15px] leading-relaxed text-ink',
          'placeholder:text-ink-faint',
          error ? 'border-maroon focus-visible:outline-maroon' : 'border-line-strong hover:border-ink-faint',
        ].join(' ')}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-maroon">
          <CircleAlert size={15} aria-hidden="true" />
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-faint">
          {hint}
        </p>
      )}
    </div>
  )
}

export default TextArea
