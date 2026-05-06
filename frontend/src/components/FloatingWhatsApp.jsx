import { MessageCircle } from 'lucide-react';
import React from 'react';

// Floating WhatsApp shortcut so visitors can contact Tandari quickly from any page.
function FloatingWhatsApp() {
  return (
    <a
      className="whatsapp"
      href="https://wa.me/263772685933"
      aria-label="Chat with Tandari on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={24} />
    </a>
  );
}

export default FloatingWhatsApp;
