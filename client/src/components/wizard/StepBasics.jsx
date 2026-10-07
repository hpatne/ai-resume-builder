// Wizard step 3: the user's own details, skills, projects and internships.
import Input from '../Input'
import SkillsForm from '../editor/SkillsForm'
import EntryListEditor from '../editor/EntryListEditor'
import { createId } from '../../utils/mockApi'

// The old sample text is only shown as grey hints inside the boxes
function projectFields(role) {
  const sample = role.projects?.[0]
  return [
    { name: 'name', label: 'Project name', placeholder: sample?.name || 'e.g. Campus Events App' },
    { name: 'techStack', label: 'Technologies', placeholder: sample?.techStack || 'e.g. React, Node.js, MongoDB' },
    { name: 'bullets', label: 'What did you build?', type: 'textarea', placeholder: sample?.bullets.join('\n') || 'What it does, your part, and the result (add numbers).', hint: 'Write in your own words. One point per line, or full sentences.' },
    { name: 'link', label: 'Link', placeholder: 'github.com/you/project', wide: true },
  ]
}

function experienceFields(role) {
  return [
    { name: 'jobTitle', label: 'Role', placeholder: `e.g. ${role.title} Intern` },
    { name: 'company', label: 'Company' },
    { name: 'startDate', label: 'Start', placeholder: 'e.g. May 2026' },
    { name: 'endDate', label: 'End', placeholder: 'e.g. Jul 2026 or Present' },
    { name: 'bullets', label: 'What did you do?', type: 'textarea', placeholder: role.experienceBullets?.join('\n') || 'What you worked on and the result (add numbers).', hint: 'Write in your own words. One point per line, or full sentences.' },
  ]
}

function StepBasics({ basics, onChange, onBlur, onFieldChange, errors, role, showEntryErrors }) {
  const field = (name, label, extra = {}) => (
    <Input id={`basics-${name}`} name={name} label={label} value={basics[name]} onChange={onChange} onBlur={onBlur} error={errors[name]} {...extra} />
  )

  return (
    <div className="space-y-8">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-lg font-bold">Contact details</legend>
        {field('fullName', 'Full name', { required: true, autoComplete: 'name' })}
        {field('email', 'Email', { required: true, type: 'email', autoComplete: 'email' })}
        {field('phone', 'Phone', { required: true, type: 'tel', autoComplete: 'tel', placeholder: '+91 98200 12345', hint: '10-digit mobile number.' })}
        {field('location', 'City', { placeholder: 'e.g. Pune, Maharashtra' })}
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-lg font-bold">Education</legend>
        {field('degree', 'Degree', { required: true, placeholder: 'e.g. B.Tech in Computer Science' })}
        {field('institution', 'College / university', { required: true })}
        {field('graduationYear', 'Graduation year', { required: true, inputMode: 'numeric', maxLength: 4, placeholder: '2027' })}
        {field('score', 'CGPA or percentage', { placeholder: 'e.g. CGPA 8.4 / 10 or 78%' })}
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-lg font-bold">Skills</legend>
        <p className="mb-3 text-sm text-ink-soft">Add the skills you really have. Press Enter or a comma after each one.</p>
        <SkillsForm value={basics.skills} onChange={(skills) => onFieldChange('skills', skills)} />
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-lg font-bold">Projects</legend>
        <p className="mb-3 text-sm text-ink-soft">Your own projects. The AI only turns your words into clean bullet points.</p>
        <EntryListEditor
          sectionKey="projects"
          entries={basics.projects}
          onChange={(projects) => onFieldChange('projects', projects)}
          fields={projectFields(role)}
          entryName="project"
          getEntryTitle={(entry) => entry.name}
          createEmptyEntry={() => ({ id: createId('proj'), name: '', techStack: '', bullets: '', link: '' })}
          showErrors={showEntryErrors}
        />
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-lg font-bold">Internships / experience</legend>
        <p className="mb-3 text-sm text-ink-soft">Freshers can skip this.</p>
        <EntryListEditor
          sectionKey="experience"
          entries={basics.experience}
          onChange={(experience) => onFieldChange('experience', experience)}
          fields={experienceFields(role)}
          entryName="internship"
          getEntryTitle={(entry) => [entry.jobTitle, entry.company].filter(Boolean).join(' · ')}
          createEmptyEntry={() => ({ id: createId('exp'), jobTitle: '', company: '', location: '', startDate: '', endDate: '', bullets: '' })}
          showErrors={showEntryErrors}
        />
      </fieldset>
    </div>
  )
}

export default StepBasics
