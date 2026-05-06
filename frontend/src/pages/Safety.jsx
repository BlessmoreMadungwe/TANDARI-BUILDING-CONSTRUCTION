import { ShieldCheck } from 'lucide-react';
import React from 'react';

// Safety and quality commitments displayed as checklist-style items.
const safetyItems = [
  ['Commitment to Safety', 'SHE-focused planning, supervision, and protective equipment.'],
  ['Staff Training', 'Task briefings and on-site guidance for safer daily execution.'],
  ['High Standards', 'Workmanship checks aligned with client expectations and project scope.'],
  ['Timely Delivery', 'Programme-aware sequencing to protect agreed timelines and budgets.'],
  ['Customer Satisfaction', 'Clear communication before, during, and after project completion.'],
];

// Safety page explaining SHE policy, staff training, and quality assurance.
function Safety() {
  return (
    <section className="section soft" id="safety">
      <div className="section-inner split">
        <div className="reveal">
          <p className="eyebrow">Safety & Quality</p>
          <h2>Safe sites, trained staff, and quality checks at every stage.</h2>
          <p>
            Tandari is committed to a practical Safety, Health and Environment policy that protects
            workers, clients, visitors, property, and surrounding communities. Site teams are
            equipped with protective gear and briefed on task-specific risks before work proceeds.
          </p>
        </div>
        <div className="quality-list reveal">
          {safetyItems.map(([title, text]) => (
            <article key={title}>
              <ShieldCheck size={24} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Safety;
