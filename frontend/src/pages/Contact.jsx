import { ClipboardCheck, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { submitContact, submitQuote } from '../api.js';
import ContactLine from '../components/ContactLine.jsx';
import { company, services } from '../data.js';

// Contact page with address details, map, contact form, and quote request form.
function Contact() {
  // Each form tracks its own loading/success/error message.
  const [contactState, setContactState] = useState({ status: 'idle', message: '' });
  const [quoteState, setQuoteState] = useState({ status: 'idle', message: '' });

  // Sends the general contact form to the Django contact endpoint.
  async function handleContact(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setContactState({ status: 'loading', message: 'Sending...' });
    try {
      await submitContact(Object.fromEntries(formData));
      event.currentTarget.reset();
      setContactState({ status: 'success', message: 'Thank you. Tandari will respond soon.' });
    } catch (error) {
      setContactState({ status: 'error', message: error.message });
    }
  }

  // Sends the project quote request form to the Django quote endpoint.
  async function handleQuote(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setQuoteState({ status: 'loading', message: 'Sending quote request...' });
    try {
      await submitQuote(Object.fromEntries(formData));
      event.currentTarget.reset();
      setQuoteState({ status: 'success', message: 'Quote request received. We will follow up.' });
    } catch (error) {
      setQuoteState({ status: 'error', message: error.message });
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner">
        <div className="section-heading reveal">
          <p className="eyebrow">Contact</p>
          <h2>Talk to Tandari about your next construction project.</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-details reveal">
            <ContactLine icon={MapPin} text={company.address} />
            {company.phones.map((phone) => (
              <ContactLine key={phone} icon={Phone} text={phone} href={`tel:${phone.replaceAll(' ', '')}`} />
            ))}
            <ContactLine icon={Mail} text={company.email} href={`mailto:${company.email}`} />
            <div className="map-frame">
              <iframe
                title="Map showing Zimre Park Ruwa"
                src="https://www.google.com/maps?q=Zimre%20Park%20Ruwa%20Zimbabwe&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form className="form-card reveal" onSubmit={handleContact}>
            <h3>Send a Message</h3>
            <label>
              Name
              <input name="name" type="text" required />
            </label>
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" required />
            </label>
            <button className="button primary" type="submit" disabled={contactState.status === 'loading'}>
              Send Message <Mail size={18} />
            </button>
            {contactState.message && <p className={`form-status ${contactState.status}`}>{contactState.message}</p>}
          </form>

          <form className="form-card quote-card reveal" id="quote" onSubmit={handleQuote}>
            <h3>Request a Quote</h3>
            <label>
              Full Name
              <input name="name" type="text" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" required />
            </label>
            <label>
              Project Type
              <select name="project_type" required defaultValue="">
                <option value="" disabled>
                  Select project type
                </option>
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
            <label>
              Location
              <input name="location" type="text" placeholder="e.g. Ruwa, Harare" />
            </label>
            <label>
              Project Details
              <textarea name="details" rows="5" required />
            </label>
            <button className="button primary" type="submit" disabled={quoteState.status === 'loading'}>
              Submit Quote <ClipboardCheck size={18} />
            </button>
            {quoteState.message && <p className={`form-status ${quoteState.status}`}>{quoteState.message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
