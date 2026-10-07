// Text box with a suggestion list (used for company and role).
import { useState } from 'react'
import { CircleAlert } from 'lucide-react'

// listPosition="inline" is used inside pop-ups
function Autocomplete({ id, label, value, options, onTextChange, onSelect, placeholder, hint, error, required = false, listPosition = 'floating' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const matchingOptions = options.filter((option) => option.label.toLowerCase().includes(value.trim().toLowerCase()))
  const listId = `${id}-list`

  const selectOption = (option) => {
    onSelect(option)
    setIsOpen(false)
  }

  // Arrow keys move, Enter picks, Escape closes
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setHighlightedIndex((index) => Math.min(index + 1, matchingOptions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && isOpen && matchingOptions[highlightedIndex]) {
      event.preventDefault()
      selectOption(matchingOptions[highlightedIndex])
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </label>
      <input
        id={id}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={isOpen && matchingOptions.length > 0}
        aria-controls={listId}
        aria-activedescendant={isOpen && matchingOptions[highlightedIndex] ? `${id}-option-${highlightedIndex}` : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : `${id}-hint`}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onTextChange(event.target.value)
          setIsOpen(true)
          setHighlightedIndex(0)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        className={`h-12 w-full rounded-md border bg-paper px-3.5 text-[17px] placeholder:text-ink-faint ${error ? 'border-maroon' : 'border-line-strong hover:border-ink-faint'}`}
      />

      {isOpen && matchingOptions.length > 0 && (
        <ul id={listId} role="listbox" className={`${listPosition === 'inline' ? 'relative' : 'absolute'} z-30 mt-1 max-h-72 w-full overflow-y-auto rounded-md border border-line-strong bg-paper py-1 shadow-pop`}>
          {matchingOptions.map((option, index) => (
            <li
              key={option.id}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
              // onMouseDown so the click works before the input loses focus
              onMouseDown={(event) => {
                event.preventDefault()
                selectOption(option)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`flex cursor-pointer items-baseline justify-between gap-3 px-3.5 py-2.5 ${index === highlightedIndex ? 'bg-board-soft' : ''}`}
            >
              <span className="font-semibold">{option.label}</span>
              {option.meta && <span className="text-sm text-ink-faint">{option.meta}</span>}
            </li>
          ))}
        </ul>
      )}

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-maroon">
          <CircleAlert size={15} aria-hidden="true" />
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-faint">{hint}</p>
      )}
    </div>
  )
}

export default Autocomplete
