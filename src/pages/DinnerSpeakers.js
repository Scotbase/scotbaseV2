import React, { useState, useEffect } from 'react';
import { getAllArtists } from '../data/dataLoader';
import ArtistCard from '../components/ArtistCard';
import './DinnerSpeakers.css';

function DinnerSpeakers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpeakers = async () => {
      setLoading(true);
      try {
        const allActs = await getAllArtists();
        // Filter acts that have 'dinner-speakers' category
        const dinnerSpeakers = allActs.filter(act => 
          act.act_category?.includes('dinner-speakers') || 
          act.categories?.some(cat => cat.toLowerCase().includes('dinner speaker'))
        );
        setSpeakers(dinnerSpeakers);
      } catch (error) {
        console.error('Error loading dinner speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSpeakers();
  }, []);

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.tribute?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.description?.toLowerCase().includes(searchTerm.toLowerCase())
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

        {loading ? (
          <div className="loading-spinner">
            <p>🎤 Loading speakers...</p>
          </div>
        ) : speakers.length === 0 ? (
          <div className="coming-soon">
            <h2>Coming Soon!</h2>
            <p>We're currently building our roster of professional dinner speakers.</p>
            <p>Check back soon or <a href="/contact">contact us</a> for more information.</p>
          </div>
        ) : filteredSpeakers.length > 0 ? (
          <div className="speakers-grid">
            {filteredSpeakers.map(speaker => (
              <ArtistCard key={speaker.id} artist={speaker} />
            ))}
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


