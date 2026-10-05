// Table used on the admin pages, with edit and delete buttons.
import { Pencil, Trash2 } from 'lucide-react'

function DataTable({ caption, columns, rows, onEdit, onDelete, getRowName }) {
  const hasActions = Boolean(onEdit || onDelete)

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-paper">
      <table className="w-full min-w-[680px] text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-ground">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="board-text border-b border-line px-3 py-2.5 text-[13px] text-ink-soft">
                {column.label}
              </th>
            ))}
            {hasActions && <th scope="col" className="board-text border-b border-line px-3 py-2.5 text-right text-[13px] text-ink-soft">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line align-top last:border-0 hover:bg-board-soft/40">
              {columns.map((column) => (
                <td key={column.key} className="px-3 py-3">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {hasActions && (
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  <button type="button" onClick={() => onEdit(row)} aria-label={`Edit ${getRowName(row)}`} className="inline-grid size-9 place-items-center rounded-md text-ink-soft hover:bg-ink/5 hover:text-ink">
                    <Pencil size={16} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => onDelete(row)} aria-label={`Delete ${getRowName(row)}`} className="inline-grid size-9 place-items-center rounded-md text-ink-soft hover:bg-maroon-soft hover:text-maroon">
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
