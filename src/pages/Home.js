import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedArtist from '../components/FeaturedArtist';
import ArtistCard from '../components/ArtistCard';
import { artists } from '../data/artists';
import './Home.css';

function Home() {
  // Get a random featured artist
  const featuredArtists = artists.filter(artist => artist.featured);
  const randomFeatured = featuredArtists[Math.floor(Math.random() * featuredArtists.length)];

  // Get some popular artists (by booking count)
  const popularArtists = [...artists]
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 6);

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
              Browse Artists
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artist */}
      <FeaturedArtist artist={randomFeatured} />

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
              View All Artists
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

