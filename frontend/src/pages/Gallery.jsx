import React from 'react';
import { gallery } from '../data.js';

// Gallery section paired with the Projects page to show construction imagery.
function Gallery() {
  return (
    <section className="section gallery-section" aria-label="Construction work gallery">
      <div className="section-inner">
        <div className="section-heading reveal">
          <p className="eyebrow">Gallery</p>
          <h2>Construction work visuals and suggested image direction.</h2>
        </div>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <figure className="gallery-item reveal" key={item.title}>
              <img src={item.image} alt={item.title} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
