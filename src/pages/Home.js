import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedArtist from '../components/FeaturedArtist';
import ArtistCard from '../components/ArtistCard';
// import CMSTestAct from '../components/CMSTestAct'; // Commented out - demo section removed
import { getFeaturedArtists, getPopularArtists } from '../data/dataLoader';
// import { getCMSActs } from '../data/dataLoader'; // Commented out - CMS demo removed
import './Home.css';

function Home() {
  const [randomFeatured, setRandomFeatured] = useState(null);
  const [popularArtists, setPopularArtists] = useState([]);
  // const [cmsActsCount, setCmsActsCount] = useState(0); // Commented out - CMS demo removed
  // const [loading, setLoading] = useState(true); // Removed - not used after commenting out CMS demo

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get featured and popular artists
        const featured = await getFeaturedArtists();
        const popular = await getPopularArtists(6);
        // const cmsActs = await getCMSActs(); // Commented out - CMS demo removed
        
        // Pick a random featured artist
        if (featured.length > 0) {
          const randomIndex = Math.floor(Math.random() * featured.length);
          setRandomFeatured(featured[randomIndex]);
        }
        
        setPopularArtists(popular);
        // setCmsActsCount(cmsActs.length); // Commented out - CMS demo removed
      } catch (error) {
        console.error('Error loading home page data:', error);
      }
      // finally { setLoading(false); } // Removed - loading state not used
    };

    loadData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Scotland's Premier Tribute Act Booking Agency</h1>
          <p className="hero-subtitle">
            Book the best tribute acts and entertainment for your events
          </p>
          <div className="hero-buttons">
            <Link to="/artists" className="btn btn-primary">
              Browse Tribute Acts
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* CMS Test Section - Commented out for production */}
      {/* 
      {cmsActsCount > 0 && (
        <section className="cms-test-section">
          <div className="popular-artists-container">
            <h2>🚀 CMS Demo - {cmsActsCount} Act{cmsActsCount !== 1 ? 's' : ''} Loaded from CMS</h2>
            <CMSTestAct />
          </div>
        </section>
      )}
      */}

      {/* Featured Artist */}
      {randomFeatured && <FeaturedArtist artist={randomFeatured} />}

      {/* Popular Artists Section */}
      <section className="popular-artists">
        <div className="popular-artists-container">
          <h2>Most Popular Acts</h2>
          <div className="artists-grid">
            {popularArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/artists" className="btn btn-primary">
              View All Tribute Acts
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Scotbase Entertainment?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎭</div>
            <h3>Top Quality Acts</h3>
            <p>Handpicked professional tribute acts with years of experience</p>
          </div>
          <div className="feature">
            <div className="feature-icon">✅</div>
            <h3>Trusted Service</h3>
            <p>Thousands of successful bookings across Scotland and beyond</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💼</div>
            <h3>All Events</h3>
            <p>Weddings, corporate events, festivals, parties and more</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎵</div>
            <h3>Wide Variety</h3>
            <p>From rock legends to pop icons, we have acts for every taste</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

