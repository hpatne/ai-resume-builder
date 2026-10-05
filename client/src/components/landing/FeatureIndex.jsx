// Landing page list of the main features.
import { PenLine, Building2, ScanSearch, Columns2, FileDown, Files } from 'lucide-react'

const FEATURES = [
  { icon: PenLine, title: 'AI-written first draft', text: 'Summary, skills, experience and projects written for your target role in a few seconds. You can then rewrite any section with AI.' },
  { icon: Building2, title: 'Company and role templates', text: 'Each company profile sets the recommended template, the section order and whether projects or experience come first.' },
  { icon: ScanSearch, title: 'ATS checker', text: 'Paste a job description to get a score out of 100, matched and missing keywords, and a list of what to fix first.' },
  { icon: Columns2, title: 'Live preview', text: 'The A4 page next to the form updates with every keystroke, so you always see what you will send.' },
  { icon: FileDown, title: 'PDF download', text: 'Downloads a text-based PDF that applicant tracking systems can read. Not an image of your resume.' },
  { icon: Files, title: 'Multiple resumes', text: 'Keep one version per application. Duplicate a resume, retarget it, and see each one’s ATS score on your dashboard.' },
]

function FeatureIndex() {
  return (
    <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 id="features-title" className="font-board max-w-xl text-4xl leading-tight font-bold">
        Everything for one application, then the next one
      </h2>

      <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4 border-t border-line py-6">
            <Icon size={24} strokeWidth={1.75} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FeatureIndex
