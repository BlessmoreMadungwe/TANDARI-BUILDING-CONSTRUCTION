import { Building2, Hammer, Home, Truck, Users, Wrench } from 'lucide-react';

// Main website navigation. These paths are used by both the header and footer.
export const navLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Team', '/team'],
  ['Projects', '/projects'],
  ['Safety', '/safety'],
  ['Contact', '/contact'],
  ['Admin', '/admin'],
];

// Short service highlights shown on the homepage under the hero section.
export const featureServices = [
  ['Building Construction', 'Residential and commercial builds managed from site setup to final handover.', Building2],
  ['Renovations & Extensions', 'Practical upgrades, conversions, and extensions that add usable value.', Hammer],
  ['Maintenance Services', 'Roofing, plumbing, drainage, carpentry, and general facility care.', Wrench],
  ['Materials Supply', 'Reliable sourcing and delivery support for quality building materials.', Truck],
];

// Icon order matches the service order from data.js.
export const serviceIcons = [Building2, Wrench, Home, Truck, Users];
