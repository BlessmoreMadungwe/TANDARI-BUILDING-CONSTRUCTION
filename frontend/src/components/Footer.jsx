import { Facebook, Instagram, Mail } from 'lucide-react';
import React from 'react';
import { navLinks } from '../constants.js';
import { company } from '../data.js';
import NavLink from './NavLink.jsx';

// Site-wide footer with quick links, contact details, and social placeholders.
function Footer() {
  return (
    <footer className="footer">
      <div className="section-inner footer-grid">
        <div>
          <h2>{company.tradingName}</h2>
          <p>{company.tagline}</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          {navLinks.map(([label, href]) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </div>
        <div>
          <h3>Contact Info</h3>
          <p>{company.address}</p>
          <p>{company.phones.join(' / ')}</p>
          <p>{company.email}</p>
        </div>
        <div>
          <h3>Social</h3>
          <div className="social-row">
            <NavLink href="/" aria-label="Facebook placeholder">
              <Facebook size={20} />
            </NavLink>
            <NavLink href="/" aria-label="Instagram placeholder">
              <Instagram size={20} />
            </NavLink>
            <a href={`mailto:${company.email}`} aria-label="Email Tandari">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
