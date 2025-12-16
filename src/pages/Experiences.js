import React, { useState } from 'react';
import './Experiences.css';

function Experiences() {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data - you can add your themed nights here
  const experiences = [];

  const filteredExperiences = experiences.filter(experience =>
    experience.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="experiences-page">
      <section className="experiences-hero">
        <h1>Themed Nights</h1>
        <p>Unforgettable themed entertainment nights for every occasion</p>
      </section>

      <div className="experiences-container">
        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search themed nights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {experiences.length === 0 ? (
          <div className="coming-soon">
            <h2>Coming Soon!</h2>
            <p>We're currently curating an exciting range of themed entertainment nights.</p>
            <p>Check back soon or <a href="/contact">contact us</a> for more information.</p>
          </div>
        ) : filteredExperiences.length > 0 ? (
          <div className="experiences-grid">
            {/* Themed night cards will go here when you add data */}
          </div>
        ) : (
          <div className="no-results">
            <h3>No themed nights found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experiences;

