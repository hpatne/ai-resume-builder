/*
 * pdf.js
 * Settings for PDF download. We use react-to-print, which opens the browser's
 * print window with only the resume page in it; the user picks "Save as PDF".
 * WHY this and not an image-based PDF library: printing keeps the resume as
 * real, selectable text, which applicant tracking systems (ATS) can read.
 * Used by: resume editor (Download PDF) and dashboard cards (Download).
 */

// A4 paper with comfortable margins; keep background colours (e.g. Modern header)
export const PRINT_PAGE_STYLE = `
  @page { size: A4; margin: 12mm 14mm; }
  html, body { background: #ffffff; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
`

// "Aarav_Sharma_Nimbus_Labs_Resume" (becomes the suggested PDF file name)
export function buildPdfFileName(resume) {
  const parts = [resume.personal?.fullName || 'Resume', resume.companyName, 'Resume']
  return parts
    .filter(Boolean)
    .join(' ')
    .replace(/[^a-zA-Z0-9]+/g, '_')
}
