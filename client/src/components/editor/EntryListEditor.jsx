/*
 * EntryListEditor.jsx
 * Shared form for sections made of repeated entries (experience, projects,
 * education, certifications). It draws one block of fields per entry, plus
 * "Add" and "Remove" buttons. Each section file only says WHICH fields it has.
 */
import { Plus, Trash2 } from 'lucide-react'
import Input from '../Input'
import TextArea from '../TextArea'

function EntryListEditor({ entries, onChange, fields, entryName, createEmptyEntry, getEntryTitle }) {
  // Change one field of one entry
  const updateEntry = (entryId, fieldName, fieldValue) => {
    onChange(entries.map((entry) => (entry.id === entryId ? { ...entry, [fieldName]: fieldValue } : entry)))
  }

  const removeEntry = (entryId) => onChange(entries.filter((entry) => entry.id !== entryId))
  const addEntry = () => onChange([...entries, createEmptyEntry()])

  return (
    <div className="space-y-4">
      {entries.length === 0 && <p className="text-[15px] text-ink-faint">No {entryName} added yet.</p>}

      {entries.map((entry, index) => (
        <div key={entry.id} className="rounded-md border border-line bg-ground/60 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="truncate text-[15px] font-bold">{getEntryTitle(entry) || `${entryName} ${index + 1}`}</h4>
            <button
              type="button"
              onClick={() => removeEntry(entry.id)}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-ink-soft hover:bg-maroon-soft hover:text-maroon"
            >
              <Trash2 size={15} aria-hidden="true" /> Remove
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) =>
              field.type === 'textarea' ? (
                <TextArea
                  key={field.name}
                  id={`${entry.id}-${field.name}`}
                  label={field.label}
                  hint={field.hint}
                  rows={4}
                  className="sm:col-span-2"
                  value={entry[field.name] || ''}
                  onChange={(event) => updateEntry(entry.id, field.name, event.target.value)}
                />
              ) : (
                <Input
                  key={field.name}
                  id={`${entry.id}-${field.name}`}
                  label={field.label}
                  placeholder={field.placeholder}
                  className={field.wide ? 'sm:col-span-2' : ''}
                  value={entry[field.name] || ''}
                  onChange={(event) => updateEntry(entry.id, field.name, event.target.value)}
                />
              )
            )}
          </div>
        </div>
      ))}

      <button type="button" onClick={addEntry} className="inline-flex h-10 items-center gap-1.5 rounded-md border border-dashed border-ink-faint px-3 text-sm font-semibold text-ink hover:border-ink hover:bg-paper">
        <Plus size={16} aria-hidden="true" /> Add {entryName}
      </button>
    </div>
  )
}

export default EntryListEditor
