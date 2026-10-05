// Row of simple grey tags.
function TagList({ tags, label }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="rounded border border-line-strong bg-paper px-2 py-0.5 text-sm font-medium">
          {tag}
        </li>
      ))}
    </ul>
  )
}

export default TagList
