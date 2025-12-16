import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah & John Mitchell",
      event: "Wedding - Edinburgh",
      rating: 5,
      text: "Absolutely fantastic! ABBA - A Rival Quartet had everyone on the dance floor all night. Professional from start to finish. Scotbase made our wedding reception unforgettable!",
      date: "September 2024"
    },
    {
      id: 2,
      name: "David Thompson",
      event: "Corporate Event - Glasgow",
      rating: 5,
      text: "We hired Forever ABBA for our company's annual gala and they exceeded all expectations. The booking process was seamless and the performance was world-class. Highly recommended!",
      date: "August 2024"
    },
    {
      id: 3,
      name: "Emma Robertson",
      event: "50th Birthday Party - Stirling",
      rating: 5,
      text: "Amazing experience from start to finish! The team at Scotbase helped us find the perfect tribute act for my husband's milestone birthday. Our guests are still talking about it!",
      date: "July 2024"
    },
    {
      id: 4,
      name: "Michael Fraser",
      event: "Festival - Aberdeen",
      rating: 5,
      text: "We've worked with Scotbase for multiple events now. Their professionalism, reliability, and quality of acts are unmatched. They're our go-to agency for all entertainment bookings.",
      date: "June 2024"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2>What Our Clients Say</h2>
        <p className="testimonials-subtitle">Don't just take our word for it - hear from our happy clients</p>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <p className="author-name">{testimonial.name}</p>
                <p className="author-event">{testimonial.event}</p>
                <p className="author-date">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-cta">
          <p>Ready to create your own success story?</p>
          <a href="/contact" className="btn btn-primary">Book Your Act Today</a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

