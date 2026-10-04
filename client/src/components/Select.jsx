/*
 * Select.jsx
 * Labelled dropdown. `options` is an array of { value, label }.
 * Used by: editor toolbar (template), ATS checker (resume picker), filters, admin forms.
 */
import { ChevronDown } from 'lucide-react'

function Select({ id, label, options, error, hideLabel = false, className = '', ...rest }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-semibold text-ink'}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          className={[
            'h-10 w-full appearance-none rounded-md border bg-paper pr-9 pl-3 text-[15px] text-ink',
            
            error ? 'border-maroon' : 'border-line-strong hover:border-ink-faint',
          ].join(' ')}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft"
        />
      </div>
      {error && <p className="mt-1.5 text-sm font-medium text-maroon">{error}</p>}
    </div>
  )
}

export default Select
