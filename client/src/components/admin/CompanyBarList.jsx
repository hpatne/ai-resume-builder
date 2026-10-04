/*
 * CompanyBarList.jsx
 * Admin dashboard chart: how many resumes target each company, as a simple
 * horizontal bar list (one colour, each bar labelled with its name and count;
 * hovering a bar shows the same numbers as a tooltip).
 */
function CompanyBarList({ counts }) {
  const rows = Object.entries(counts).sort((first, second) => second[1] - first[1])
  const largest = Math.max(1, ...rows.map(([, count]) => count))

  return (
    <ul className="space-y-3" aria-label="Resumes per target company">
      {rows.map(([companyName, count]) => (
        <li key={companyName} className="grid grid-cols-[minmax(0,10rem)_1fr_2rem] items-center gap-3 text-[15px]">
          <span className="truncate font-medium" title={companyName}>{companyName}</span>
          <span className="h-3 rounded-r-[4px] bg-navy" style={{ width: `${(count / largest) * 100}%` }} title={`${companyName}: ${count} resume${count === 1 ? '' : 's'}`} />
          <span className="tabular text-right font-semibold">{count}</span>
        </li>
      ))}
    </ul>
  )
}

export default CompanyBarList
