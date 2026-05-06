import React from 'react';
import { serviceIcons } from '../constants.js';
import { services } from '../data.js';

// Services page listing Tandari's construction and support services.
function Services() {
  return (
    <section className="section soft" id="services">
      <div className="section-inner">
        <div className="section-heading reveal">
          <p className="eyebrow">Services</p>
          <h2>Construction services for new work, repairs, supply, and site support.</h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article className="service-card reveal" key={service.title}>
                <Icon size={30} />
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
