import { Menu, X } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { company } from '../data.js';
import { navLinks } from '../constants.js';
import NavLink from './NavLink.jsx';

// Sticky top navigation used on every page.
function Header() {
  // Controls the mobile navigation drawer.
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <NavLink className="brand" href="/" onClick={closeMenu}>
        <span className="brand-mark">T</span>
        <span>
          <strong>{company.tradingName}</strong>
          <small>{company.legalName}</small>
        </span>
      </NavLink>
      <button
        className="icon-button menu-button"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        {navLinks.map(([label, href]) => (
          <NavLink key={href} href={href} onClick={closeMenu}>
            {label}
          </NavLink>
        ))}
        <NavLink className="nav-cta" href="/contact" onClick={closeMenu}>
          Quote
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
