/*
 * ScrollToTop.jsx
 * Scrolls to the top when the page changes (single-page apps keep the old
 * scroll position otherwise). Links with a #hash scroll to that section instead.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
