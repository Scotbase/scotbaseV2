import React, { useState, useEffect } from 'react';
import { getAllArtists } from '../data/dataLoader';
import ArtistCard from '../components/ArtistCard';
import ArtistCardSkeleton from '../components/ArtistCardSkeleton';
import SEO from '../components/SEO';
import './Experiences.css';

function Experiences() {
  const [searchTerm, setSearchTerm] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      setLoading(true);
      const startTime = Date.now();
      const minLoadingTime = 500; // Minimum 500ms to show skeleton
      
      try {
        const allActs = await getAllArtists();
        // Filter acts that have 'themed-nights' category
        const themedNights = allActs.filter(act => 
          act.act_category?.includes('themed-nights') || 
          act.categories?.some(cat => cat.toLowerCase().includes('themed night'))
        );
        setExperiences(themedNights);
      } catch (error) {
        console.error('Error loading themed nights:', error);
      } finally {
        // Ensure minimum loading time for better UX
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadingTime - elapsed);
        setTimeout(() => {
          setLoading(false);
        }, remaining);
      }
    };

    loadExperiences();
  }, []);

  const filteredExperiences = experiences.filter(experience =>
    experience.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    experience.tribute?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    experience.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="experiences-page">
      <SEO 
        title="Themed Nights"
        description="Discover our themed night experiences perfect for parties, events, and special occasions. From 80s nights to ABBA tributes, create unforgettable entertainment experiences."
        url="/experiences"
        image="/images/scotbase-logo.png"
      />
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

        {loading ? (
          <div className="experiences-grid">
            {[...Array(6)].map((_, index) => (
              <ArtistCardSkeleton key={index} />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="coming-soon">
            <h2>Coming Soon!</h2>
            <p>We're currently curating an exciting range of themed entertainment nights.</p>
            <p>Check back soon or <a href="/contact">contact us</a> for more information.</p>
          </div>
        ) : filteredExperiences.length > 0 ? (
          <div className="experiences-grid">
            {filteredExperiences.map(experience => (
              <ArtistCard key={experience.id} artist={experience} />
            ))}
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

