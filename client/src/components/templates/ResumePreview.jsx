/*
 * ResumePreview.jsx
 * Shows a resume as an A4 sheet of paper, scaled down to fit its container.
 * The real page is always 794 px wide (A4 at 96 dpi); a CSS transform shrinks
 * it on screen, while the printed PDF uses the full-size, unscaled page.
 * Dashed lines mark where page 2, 3... will start in the PDF.
 * Used by: resume editor (live preview), wizard and gallery thumbnails, landing demo.
 */
import { useEffect, useRef, useState } from 'react'
import TemplateRenderer from './TemplateRenderer'

const PAGE_WIDTH = 794
const PAGE_HEIGHT = 1123

function ResumePreview({ resume, layout, printRef, showPageBreaks = false, maxScale = 1 }) {
  const containerRef = useRef(null)
  const localPageRef = useRef(null)
  const pageRef = printRef || localPageRef

  const [scale, setScale] = useState(0.5)
  const [contentHeight, setContentHeight] = useState(PAGE_HEIGHT)

  // Re-measure whenever the container is resized or the resume grows/shrinks
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !pageRef.current) return
      setScale(Math.min(maxScale, containerRef.current.clientWidth / PAGE_WIDTH))
      setContentHeight(Math.max(PAGE_HEIGHT, pageRef.current.offsetHeight))
    }
    const observer = new ResizeObserver(measure)
    observer.observe(containerRef.current)
    observer.observe(pageRef.current)
    return () => observer.disconnect()
  }, [pageRef, maxScale])

  const pageCount = Math.ceil(contentHeight / PAGE_HEIGHT)

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative mx-auto overflow-hidden bg-white shadow-paper" style={{ width: PAGE_WIDTH * scale, height: contentHeight * scale }}>
        <div style={{ width: PAGE_WIDTH, minHeight: PAGE_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <TemplateRenderer ref={pageRef} resume={resume} layout={layout} />
        </div>

        {/* Page-break markers (only on screen, never printed) */}
        {showPageBreaks &&
          Array.from({ length: pageCount - 1 }, (_, index) => (
            <div
              key={index}
              aria-hidden="true"
              className="absolute inset-x-0 border-t border-dashed border-maroon/60"
              style={{ top: (index + 1) * PAGE_HEIGHT * scale }}
            >
              <span className="board-text absolute right-1 -top-5 text-[11px] text-maroon">Page {index + 2}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ResumePreview
