import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Gayle Campbell",
      rating: 5,
      text: "My wedding singer pulled out at last minute but Robert and Joan got me another singer within a matter of a few hours. Very helpful and professional people.",
    },
    {
      id: 2,
      name: "Denise Ashwood",
      rating: 5,
      text: "These guys work hard. Promised to keep me supplied with bookings and have lived up to that promise. Dee is TWILITE",
    },
    {
      id: 3,
      name: "Elizabeth Marshall",
      rating: 5,
      text: "First class acts run by experienced team",
      date: "June 2019"
    },
    {
      id: 4,
      name: "Robert Fraser",
      rating: 5,
      text: "The acts are of the highest quality.",
      date: "October 2018"
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

