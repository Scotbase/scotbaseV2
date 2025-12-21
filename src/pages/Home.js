import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedArtist from '../components/FeaturedArtist';
import ArtistCard from '../components/ArtistCard';
import Testimonials from '../components/Testimonials';
import StatsCounter from '../components/StatsCounter';
// import CMSTestAct from '../components/CMSTestAct'; // Commented out - demo section removed
import { getFeaturedArtists, getPopularArtists, getAllArtists } from '../data/dataLoader';
// import { getCMSActs } from '../data/dataLoader'; // Commented out - CMS demo removed
import './Home.css';

function Home() {
  const [randomFeatured, setRandomFeatured] = useState(null);
  const [popularArtists, setPopularArtists] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  // const [cmsActsCount, setCmsActsCount] = useState(0); // Commented out - CMS demo removed
  // const [loading, setLoading] = useState(true); // Removed - not used after commenting out CMS demo

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get all artists to populate hero slideshow
        const allActs = await getAllArtists();
        
        // Get featured and popular artists (now includes WordPress data)
        const featured = await getFeaturedArtists();
        const popular = await getPopularArtists(6);
        
        // Pick a random featured artist
        if (featured.length > 0) {
          const randomIndex = Math.floor(Math.random() * featured.length);
          setRandomFeatured(featured[randomIndex]);
        }
        
        setPopularArtists(popular);
        
        // Use images from acts for hero slideshow
        // Filter to get acts with images and take up to 5
        const actsWithImages = allActs
          .filter(act => act.image && !act.image.includes('placeholder'))
          .slice(0, 5);
        
        if (actsWithImages.length > 0) {
          setHeroImages(actsWithImages.map(act => act.image));
        } else {
          // Fallback to default images if no acts available
          setHeroImages([
            '/images/abba-a-rival-quartet.png',
            '/images/forever-abba.png',
            '/images/super-troopers.png',
            '/images/gimme-abba.png'
          ]);
        }
      } catch (error) {
        console.error('❌ Error loading home page data:', error);
        // Fallback to default images on error
        setHeroImages([
          '/images/abba-a-rival-quartet.png',
          '/images/forever-abba.png',
          '/images/super-troopers.png',
          '/images/gimme-abba.png'
        ]);
      }
    };

    loadData();
  }, []);

  // Hero slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Scotland's Premier Performance Act Booking Agency</h1>
          <p className="hero-subtitle">
            Book the best performance acts and entertainment for your events
          </p>
          <div className="hero-buttons">
            <Link to="/artists" className="btn btn-primary">
              Browse Performance Acts
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <StatsCounter />

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
              View All Performance Acts
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

      {/* Testimonials Section */}
      <Testimonials />

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <div className="map-content">
            <div className="map-info">
              <h2>Find Us</h2>
              <p className="map-description">Based in Paisley, serving clients across Scotland</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>103 Abercorn Street<br />Paisley, PA3 4AT</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p><a href="tel:01418490333">0141 849 0333</a></p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:info@scotbase.net">info@scotbase.net</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-embed">
              <iframe
                title="Scotbase Entertainment Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2241.234567890123!2d-4.423456789012345!3d55.84567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488846e234567890%3A0x1234567890abcdef!2s103%20Abercorn%20St%2C%20Paisley%20PA3%204AT!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

