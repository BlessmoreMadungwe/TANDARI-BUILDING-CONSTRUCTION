import { Award } from 'lucide-react';
import React from 'react';
import { testimonials } from '../data.js';

// Homepage testimonials section with placeholder client feedback.
function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="section-inner">
        <div className="section-heading reveal">
          <p className="eyebrow">Testimonials</p>
          <h2>Clear communication, tidy workmanship, and dependable delivery.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <blockquote className="testimonial-card reveal" key={item.author}>
              <Award size={24} />
              <p>{item.quote}</p>
              <cite>{item.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
