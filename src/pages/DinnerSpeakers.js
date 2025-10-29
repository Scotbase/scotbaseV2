import React, { useState } from 'react';
import './DinnerSpeakers.css';

function DinnerSpeakers() {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data - you can add your dinner speakers here
  const speakers = [];

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dinner-speakers-page">
      <section className="dinner-speakers-hero">
        <h1>Dinner Speakers</h1>
        <p>Professional speakers for your corporate events and dinners</p>
      </section>

      <div className="dinner-speakers-container">
        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search speakers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {speakers.length === 0 ? (
          <div className="coming-soon">
            <h2>Coming Soon!</h2>
            <p>We're currently building our roster of professional dinner speakers.</p>
            <p>Check back soon or <a href="/contact">contact us</a> for more information.</p>
          </div>
        ) : filteredSpeakers.length > 0 ? (
          <div className="speakers-grid">
            {/* Speaker cards will go here when you add data */}
          </div>
        ) : (
          <div className="no-results">
            <h3>No speakers found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DinnerSpeakers;


