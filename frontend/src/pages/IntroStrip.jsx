import React from 'react';
import { featureServices } from '../constants.js';

// Homepage service summary cards shown immediately after the hero.
function IntroStrip() {
  return (
    <section className="intro-strip" aria-label="Key services">
      <div className="section-inner service-highlights">
        {featureServices.map(([title, text, Icon]) => (
          <article className="highlight-card reveal" key={title}>
            <Icon size={28} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IntroStrip;
