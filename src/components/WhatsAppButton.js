import React from 'react';
import './WhatsAppButton.css';

function WhatsAppButton() {
  // Replace with your actual WhatsApp business number
  // Format: country code + number (no + sign, spaces, or dashes)
  const phoneNumber = '441418490333'; // 0141 849 0333
  const message = encodeURIComponent('Hi Scotbase! I\'m interested in booking a tribute act for my event.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <svg
        className="whatsapp-icon"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 8.188-2.113c2.354 1.213 5.011 1.863 7.812 1.863 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.5c-2.547 0-5.053-0.719-7.2-2.075l-0.525-0.3-5.438 1.4 1.463-5.438-0.338-0.55c-1.513-2.438-2.313-5.25-2.313-8.138 0-8.15 6.637-14.787 14.788-14.787s14.788 6.637 14.788 14.788-6.638 14.788-14.788 14.788zM21.95 18.238c-0.394-0.2-2.331-1.15-2.688-1.281-0.356-0.131-0.619-0.2-0.875 0.2s-1.006 1.281-1.238 1.544c-0.225 0.262-0.456 0.3-0.85 0.1-0.394-0.2-1.669-0.619-3.175-1.969-1.175-1.050-1.969-2.35-2.194-2.744s-0.025-0.612 0.175-0.813c0.181-0.175 0.394-0.456 0.594-0.688 0.2-0.225 0.262-0.394 0.394-0.656 0.131-0.262 0.069-0.494-0.031-0.694s-0.875-2.113-1.2-2.894c-0.319-0.756-0.637-0.65-0.875-0.662-0.225-0.012-0.488-0.012-0.75-0.012s-0.681 0.1-1.038 0.494c-0.356 0.394-1.363 1.331-1.363 3.244s1.394 3.763 1.588 4.025c0.2 0.262 2.775 4.237 6.719 5.944 0.938 0.406 1.669 0.65 2.238 0.831 0.944 0.3 1.8 0.256 2.481 0.156 0.756-0.113 2.331-0.95 2.656-1.869 0.331-0.919 0.331-1.706 0.231-1.869s-0.362-0.262-0.756-0.462z"
        />
      </svg>
      <span className="whatsapp-text">Chat with us</span>
    </a>
  );
}

export default WhatsAppButton;

