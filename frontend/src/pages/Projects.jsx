import React from 'react';
import { projects } from '../data.js';

// Projects page highlighting recent and current construction work.
function Projects() {
  return (
    <section className="section section-dark projects-section" id="projects">
      <div className="section-inner">
        <div className="section-heading reveal">
          <p className="eyebrow">Projects</p>
          <h2>Recent work across residential construction, conversions, and roofing.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card reveal" key={project.title}>
              <span className={project.status === 'Completed' ? 'status done' : 'status progress'}>
                {project.status}
              </span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <strong>{project.value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
