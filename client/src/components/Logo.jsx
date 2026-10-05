// App logo and name.
import { Link } from 'react-router-dom'

function Logo({ tone = 'dark', to = '/' }) {
  const textColor = tone === 'light' ? 'text-white' : 'text-ink'

  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 rounded ${textColor}`} aria-label="AI Resume Builder home">
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill={tone === 'light' ? '#1d3a66' : '#12284a'} />
        <rect x="5" y="8" width="22" height="16" rx="1.5" fill="#f5c11b" />
        <rect x="5" y="8" width="22" height="2.5" fill="#121620" />
        <rect x="5" y="21.5" width="22" height="2.5" fill="#121620" />
        <rect x="9" y="13.5" width="14" height="2" rx="1" fill="#121620" />
        <rect x="9" y="17" width="9" height="2" rx="1" fill="#121620" />
      </svg>
      <span className="board-text text-xl leading-none">AI Resume Builder</span>
    </Link>
  )
}

export default Logo
