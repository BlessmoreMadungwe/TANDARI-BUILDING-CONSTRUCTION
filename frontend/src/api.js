// Base URL for the Django backend. Vite can override this with VITE_API_BASE_URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export { API_BASE_URL };

// Sends the contact form details to Django.
export async function submitContact(payload) {
  return postJson('/api/contact/', payload);
}

// Sends the quote request form details to Django.
export async function submitQuote(payload) {
  return postJson('/api/quote/', payload);
}

export async function getJson(path) {
  return requestJson(path);
}

export async function putJson(path, payload) {
  return requestJson(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function deleteJson(path) {
  return requestJson(path, { method: 'DELETE' });
}

export async function postForm(path, formData) {
  return requestJson(path, {
    method: 'POST',
    body: formData,
  });
}

// Shared helper for JSON POST requests, including basic error handling for the UI.
async function postJson(path, payload) {
  return requestJson(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    // Django returns readable error messages; fall back to a friendly generic message.
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Unable to submit your request right now.');
  }

  return response.json();
}
