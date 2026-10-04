/*
 * Input.jsx
 * Labelled text input with optional hint, error message and an element on the
 * right side (used by PasswordInput for the show/hide button).
 * Used by: every form (login, signup, wizard, editor, profile, admin).
 */
import { CircleAlert } from 'lucide-react'

function Input({ id, label, error, hint, required = false, endAdornment, className = '', ...rest }) {
  // Connect hint/error text to the input so screen readers announce it
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            'h-10 w-full rounded-md border bg-paper px-3 text-[15px] text-ink placeholder:text-ink-faint',
            'transition-colors',
            error ? 'border-maroon focus-visible:outline-maroon' : 'border-line-strong hover:border-ink-faint',
            endAdornment ? 'pr-11' : '',
          ].join(' ')}
          {...rest}
        />
        {endAdornment && <div className="absolute inset-y-0 right-1 flex items-center">{endAdornment}</div>}
      </div>

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

export default Input
