import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Scotbase Entertainment</h3>
          <p>Scotland's premier performance act booking agency</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/artists">Browse Artists</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 info@scotbase.com</p>
          <p>📞 0141 849 0333</p>
          <p>📍 103 Abercorn Street</p>
          <p style={{ marginLeft: '1.5rem' }}>Paisley, PA3 4AT</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/scotbaseentertainments" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
            <a href="https://www.youtube.com/@Scotbase" target="_blank" rel="noopener noreferrer">📺 YouTube</a>
            <a href="https://www.instagram.com/scotbase_entertainment" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Scotbase Entertainment. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

