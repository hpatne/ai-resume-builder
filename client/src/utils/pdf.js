// PDF download settings. We print the page so the text stays readable for ATS.
// A4 page; keep background colours
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
