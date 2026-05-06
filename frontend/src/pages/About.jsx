import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import { values } from '../data.js';

// About page with company overview, vision, mission, and core values.
function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner split">
        <div className="reveal">
          <p className="eyebrow">About Us</p>
          <h2>Reliable construction delivery with clear accountability.</h2>
          <p>
            Tandari Investments (Pvt) Ltd t/a Tandari Building & Construction provides building
            contracting, maintenance, materials supply, driveway construction, and labour support
            for residential and commercial clients. The company is built around practical site
            management, transparent communication, and workmanship that stands up after handover.
          </p>
          <div className="statement-grid">
            <article>
              <h3>Vision</h3>
              <p>To become a reputable, preferred and trusted building contractor and supplier.</p>
            </article>
            <article>
              <h3>Mission</h3>
              <p>To deliver high-quality construction solutions within agreed time and budget.</p>
            </article>
          </div>
        </div>
        <div className="values-panel reveal">
          <h3>Core Values</h3>
          <div className="values-list">
            {values.map((value) => (
              <span key={value}>
                <CheckCircle2 size={17} /> {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
