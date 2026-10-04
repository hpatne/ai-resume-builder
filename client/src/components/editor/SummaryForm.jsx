/*
 * SummaryForm.jsx
 * Editor form for the professional summary, with a live word count
 * (40–80 words reads best and is what the ATS check looks for).
 */
import TextArea from '../TextArea'

function SummaryForm({ value, onChange }) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0
  const isGoodLength = wordCount >= 40 && wordCount <= 80

  return (
    <TextArea
      id="summary-text"
      label="Professional summary"
      rows={5}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      hint={`${wordCount} words. ${isGoodLength ? 'Good length.' : 'Aim for 40–80 words.'}`}
    />
  )
}

export default SummaryForm
