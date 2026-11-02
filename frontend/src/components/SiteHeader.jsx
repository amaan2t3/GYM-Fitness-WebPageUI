import { useState } from 'react'
import { ArrowRight, Dumbbell, Menu, X } from 'lucide-react'

const links = [
  ['Men’s fitness', '#mensfitness'],
  ['Ladies’ fitness', '#ladiesfitness'],
  ['Coaches', '#trainers'],
  ['Membership', '#pricing'],
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={closeMenu} aria-label="Amaan’s Gym & Fitness home">
        <span className="brand-mark"><Dumbbell size={21} strokeWidth={2.5} /></span>
        <span className="brand-name">AMAAN’S<span className="brand-light"> GYM & FITNESS</span></span>
      </a>

      <button
        className="mobile-menu-toggle"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu}>{label}</a>
        ))}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Join Now <ArrowRight size={16} />
        </a>
      </nav>
    </header>
  )
}
