/*
 * EditorSection.jsx
 * One collapsible section in the editor's left column. The header has the
 * section name, an entry count, move up/down buttons (to reorder sections on
 * the resume) and, for some sections, "Improve with AI".
 * Up/down buttons are used instead of drag-and-drop so it works with a keyboard.
 */
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react'
import ImproveWithAiButton from './ImproveWithAiButton'

function EditorSection({ sectionKey, title, count, isOpen, onToggle, onMoveUp, onMoveDown, onImprove, isImproving, children }) {
  const moveButtonClasses = 'grid size-8 place-items-center rounded text-ink-soft hover:bg-ink/5 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent'

  return (
    <section id={`section-${sectionKey}`} className="scroll-mt-24 rounded-lg border border-line bg-paper">
      <header className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:px-4">
        <button type="button" onClick={onToggle} aria-expanded={isOpen} aria-controls={`section-body-${sectionKey}`} className="flex min-w-0 flex-1 items-center gap-2 rounded py-1 text-left">
          <ChevronDown size={18} aria-hidden="true" className={`shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
          <h3 className="board-text truncate text-[17px]">{title}</h3>
          {typeof count === 'number' && <span className="tabular rounded bg-ground px-1.5 text-sm font-semibold text-ink-faint">{count}</span>}
        </button>

        {onImprove && <ImproveWithAiButton onClick={onImprove} isLoading={isImproving} />}

        {/* Reorder: only the six movable sections get these buttons */}
        {(onMoveUp || onMoveDown) && (
          <div className="flex">
            <button type="button" onClick={onMoveUp} disabled={!onMoveUp} aria-label={`Move ${title} up`} className={moveButtonClasses}>
              <ArrowUp size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={onMoveDown} disabled={!onMoveDown} aria-label={`Move ${title} down`} className={moveButtonClasses}>
              <ArrowDown size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </header>

      {isOpen && (
        <div id={`section-body-${sectionKey}`} className="border-t border-line px-3 py-4 sm:px-4">
          {children}
        </div>
      )}
    </section>
  )
}

export default EditorSection
