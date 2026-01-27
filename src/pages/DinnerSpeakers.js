import React, { useState, useEffect } from 'react';
import { getAllArtists } from '../data/dataLoader';
import ArtistCard from '../components/ArtistCard';
import ArtistCardSkeleton from '../components/ArtistCardSkeleton';
import SEO from '../components/SEO';
import './DinnerSpeakers.css';

function DinnerSpeakers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpeakers = async () => {
      setLoading(true);
      const startTime = Date.now();
      const minLoadingTime = 500; // Minimum 500ms to show skeleton
      
      try {
        const allActs = await getAllArtists();
        // Filter acts that have 'dinner-speakers' category
        const dinnerSpeakers = allActs.filter(act => 
          act.act_category?.includes('dinner-speakers') || 
          act.categories?.some(cat => cat.toLowerCase().includes('dinner speaker'))
        );
        
        // Log genre data for debugging
        console.log('🎤 Dinner Speakers found:', dinnerSpeakers.length);
        dinnerSpeakers.forEach(speaker => {
          console.log(`📝 ${speaker.name}:`, {
            genre: speaker.genre,
            act_genre: speaker.act_genre,
            genres: speaker.genres,
            act_category: speaker.act_category,
            categories: speaker.categories
          });
        });
        
        setSpeakers(dinnerSpeakers);
      } catch (error) {
        console.error('Error loading dinner speakers:', error);
      } finally {
        // Ensure minimum loading time for better UX
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadingTime - elapsed);
        setTimeout(() => {
          setLoading(false);
        }, remaining);
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
      <SEO 
        title="Dinner Speakers"
        description="Book professional dinner speakers for your corporate events, awards dinners, and special occasions across Scotland. Engaging speakers to entertain and inspire your guests."
        url="/dinner-speakers"
        image="/images/scotbase-logo.png"
      />
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
          <div className="speakers-grid">
            {[...Array(6)].map((_, index) => (
              <ArtistCardSkeleton key={index} />
            ))}
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


