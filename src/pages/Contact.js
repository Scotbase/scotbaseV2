import React, { useState } from 'react';
import SEO from '../components/SEO';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    artist: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a placeholder - in production, you'd send this to your backend
    alert('Thank you for your enquiry! We\'ll get back to you soon.');
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us"
        description="Get in touch with Scotbase to book tribute acts, dinner speakers, or themed night experiences. We're here to help make your event unforgettable."
        url="/contact"
        image="/images/scotbase-logo.png"
      />
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Ready to book an artist? Have questions? We're here to help!</p>
      </section>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="contact-intro">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <span className="contact-icon">📧</span>
                <div>
                  <h3>Email</h3>
                  <p>info@scotbase.com</p>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-icon">📞</span>
                <div>
                  <h3>Phone</h3>
                  <p>+44 7748 323748</p>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-icon">📍</span>
                <div>
                  <h3>Address</h3>
                  <p>Scotbase</p>
                  <p>103 Abercorn Street</p>
                  <p>Paisley, PA3 4AT</p>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-icon">⏰</span>
                <div>
                  <h3>Hours</h3>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="https://www.facebook.com/scotbaseentertainments" target="_blank" rel="noopener noreferrer" className="social-icon">📘 Facebook</a>
                <a href="https://www.youtube.com/@Scotbase" target="_blank" rel="noopener noreferrer" className="social-icon">📺 YouTube</a>
                <a href="https://www.instagram.com/scotbase_entertainment" target="_blank" rel="noopener noreferrer" className="social-icon">📷 Instagram</a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 XXX XXX XXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventDate">Event Date</label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventType">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="festival">Festival</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="artist">Interested Artist</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  placeholder="Artist or tribute act name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us about your event and any specific requirements..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;

