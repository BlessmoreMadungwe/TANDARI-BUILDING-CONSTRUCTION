import React from 'react';

// Small reusable row for contact information with an icon and optional clickable link.
function ContactLine({ icon: Icon, text, href }) {
  const content = (
    <>
      <Icon size={20} /> <span>{text}</span>
    </>
  );

  return href ? (
    <a className="contact-line" href={href}>
      {content}
    </a>
  ) : (
    <p className="contact-line">{content}</p>
  );
}

export default ContactLine;
