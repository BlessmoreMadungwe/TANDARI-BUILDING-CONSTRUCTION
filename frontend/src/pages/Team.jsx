import React from 'react';
import { team } from '../data.js';

// Team page with leadership and site supervision cards.
function Team() {
  return (
    <section className="section" id="team">
      <div className="section-inner">
        <div className="section-heading reveal">
          <p className="eyebrow">Team</p>
          <h2>Experienced leadership and site supervision.</h2>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card reveal" key={member.name}>
              <div className="avatar" aria-hidden="true">
                {member.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p>{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
