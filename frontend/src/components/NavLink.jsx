import React from 'react';
import { navigateTo } from '../router.js';

// Reusable link that handles internal React page navigation without reloading the browser.
function NavLink({ className, href, children, onClick, ...props }) {
  function handleClick(event) {
    // Internal links use the small client-side router; external/hash links behave normally.
    if (href.startsWith('/')) {
      event.preventDefault();
      navigateTo(href);
    }

    onClick?.();
  }

  return (
    <a className={className} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default NavLink;
