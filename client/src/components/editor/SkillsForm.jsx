/*
 * SkillsForm.jsx
 * Editor form for skills: a list of removable tags plus a box to add more.
 * Press Enter (or comma) to add; duplicates are ignored.
 */
import { useState } from 'react'
import { X, Plus } from 'lucide-react'

function SkillsForm({ value, onChange }) {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    const skill = newSkill.trim().replace(/,$/, '')
    const alreadyAdded = value.some((existing) => existing.toLowerCase() === skill.toLowerCase())
    if (skill && !alreadyAdded) onChange([...value, skill])
    setNewSkill('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addSkill()
    }
  }

  return (
    <div>
      <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
        {value.map((skill) => (
          <li key={skill} className="inline-flex items-center gap-1 rounded border border-line-strong bg-paper py-0.5 pr-1 pl-2 text-sm font-medium">
            {skill}
            <button type="button" onClick={() => onChange(value.filter((item) => item !== skill))} aria-label={`Remove ${skill}`} className="grid size-5 place-items-center rounded text-ink-faint hover:bg-maroon-soft hover:text-maroon">
              <X size={13} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex gap-2">
        <label htmlFor="new-skill" className="sr-only">Add a skill</label>
        <input
          id="new-skill"
          value={newSkill}
          onChange={(event) => setNewSkill(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="h-10 min-w-0 flex-1 rounded-md border border-line-strong bg-paper px-3 text-[15px] placeholder:text-ink-faint hover:border-ink-faint"
        />
        <button type="button" onClick={addSkill} className="inline-flex h-10 items-center gap-1.5 rounded-md border border-line-strong bg-paper px-3 text-sm font-semibold hover:border-ink">
          <Plus size={16} aria-hidden="true" /> Add
        </button>
      </div>
    </div>
  )
}

export default SkillsForm
