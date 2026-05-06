import { ArrowRight, Phone } from 'lucide-react';
import React from 'react';
import { company } from '../data.js';
import NavLink from '../components/NavLink.jsx';

// Homepage hero with the main brand message and calls to action.
function Hero() {
  return (
    <section className="hero section-dark" id="home">
      <div className="hero-overlay" />
      <div className="section-inner hero-content reveal">
        <p className="eyebrow">{company.legalName} t/a</p>
        <h1>{company.tradingName}</h1>
        <p className="hero-tagline">{company.tagline}</p>
        <p className="hero-copy">{company.intro}</p>
        <div className="button-row">
          <NavLink className="button primary" href="/contact">
            Request a Quote <ArrowRight size={18} />
          </NavLink>
          <NavLink className="button secondary" href="/contact">
            Contact Us <Phone size={18} />
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Hero;
