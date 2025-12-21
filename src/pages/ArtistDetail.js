import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArtistById, getAllArtists } from '../data/dataLoader';
import { handleImageError } from '../utils/imageHelper';
import './ArtistDetail.css';

function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'star filled' : 'star'}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  const handleBookNow = () => {
    navigate(`/contact?artist=${encodeURIComponent(artist.name)}`);
  };

  const handleWatchVideo = (e) => {
    e.preventDefault();
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Scroll to top immediately when page loads
    window.scrollTo(0, 0);
    
    const loadArtist = async () => {
      setLoading(true);
      try {
        const foundArtist = await getArtistById(id);
        setArtist(foundArtist);

        if (foundArtist) {
          // Get related artists
          const allArtists = await getAllArtists();
          const related = allArtists
            .filter(a => a.genre === foundArtist.genre && String(a.id) !== String(id))
            .slice(0, 3);
          setRelatedArtists(related);
        }
      } catch (error) {
        console.error('Error loading artist:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="artist-detail-page">
        <div className="loading-spinner">
          <p>🎵 Loading act details...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="artist-not-found">
        <h2>Act Not Found</h2>
        <p>Sorry, we couldn't find the act you're looking for.</p>
        <Link to="/artists" className="btn btn-primary">Back to Performance Acts</Link>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(artist.videoUrl);

  return (
    <div className="artist-detail-page">
      {/* Hero Section */}
      <div className="artist-detail-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content-wrapper">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/artists">Acts</Link> / <span>{artist.name}</span>
          </div>
          
          <div className="hero-main">
            <div className="hero-text">
              {artist.featured && <span className="featured-badge-hero">⭐ Featured Act</span>}
              <h1 className="detail-artist-name">{artist.name}</h1>
              <h2 className="detail-tribute">{artist.tribute}</h2>
              
              {artist.rating && (
                <div className="detail-rating">
                  {renderStars(artist.rating)}
                  <span className="rating-number">({artist.rating}/5)</span>
                  {artist.bookingCount && (
                    <span className="booking-count"> • {artist.bookingCount} bookings</span>
                  )}
                </div>
              )}

              <div className="hero-quick-info">
                <span className="quick-info-item">🎵 {artist.genre}</span>
                <span className={`quick-info-item availability-${artist.availability.toLowerCase()}`}>
                  ✅ {artist.availability}
                </span>
              </div>

              {/* Key Highlights - Compact */}
              <div className="hero-highlights">
                <ul className="highlights-list">
                  <li>✓ Professional performance & equipment</li>
                  <li>✓ Suitable for all event types</li>
                </ul>
              </div>

              {/* Quick Stats */}
              {(artist.bookingCount || artist.rating) && (
                <div className="hero-stats">
                  {artist.bookingCount && (
                    <div className="stat-box">
                      <div className="stat-number">{artist.bookingCount}+</div>
                      <div className="stat-label">Events</div>
                    </div>
                  )}
                  {artist.rating && (
                    <div className="stat-box">
                      <div className="stat-number">{artist.rating}.0</div>
                      <div className="stat-label">Rating</div>
                    </div>
                  )}
                </div>
              )}

              <div className="hero-action-buttons">
                <button onClick={handleBookNow} className="btn btn-large btn-primary">
                  📞 Request Quote
                </button>
                {videoId && (
                  <button onClick={handleWatchVideo} className="btn btn-large btn-secondary">
                    🎬 Watch Performance
                  </button>
                )}
              </div>
            </div>

            <div className="hero-image-container">
              <img 
                src={artist.image} 
                alt={artist.name} 
                className="hero-artist-image"
                onError={(e) => handleImageError(e, artist)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {videoId && (
        <section className="video-section" id="video-section">
          <div className="section-container">
            <h2 className="section-title">Watch {artist.name} Perform</h2>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${artist.name} Performance`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-video"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="about-section">
        <div className="section-container">
          <h2 className="section-title">About This Act</h2>
          <p className="about-text">{artist.description}</p>
          
          {artist.tags && artist.tags.length > 0 && (
            <div className="tags-section">
              <h3>Act Highlights:</h3>
              <div className="tags-grid">
                {artist.tags.map((tag, index) => (
                  <span key={index} className="detail-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Book This Act */}
      <section className="why-book-section">
        <div className="section-container">
          <h2 className="section-title">Why Book {artist.name}?</h2>
          <div className="features-grid-detail">
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3>Professional Performance</h3>
              <p>Experienced performers who deliver an authentic and memorable show</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎤</div>
              <h3>High-Quality Sound</h3>
              <p>Professional equipment and vocals that capture the original artist perfectly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👔</div>
              <h3>Authentic Costumes</h3>
              <p>Stunning replica outfits that transport you back to the original era</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎉</div>
              <h3>Crowd Pleasers</h3>
              <p>Guaranteed to get your guests dancing and singing along</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-detail-section">
        <div className="section-container">
          <h2 className="section-title">What Clients Say</h2>
          <div className="testimonials-detail-grid">
            <div className="testimonial-detail-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Absolutely incredible performance! They had everyone on their feet all night. Would highly recommend for any event!"</p>
              <p className="testimonial-author">- Sarah M., Wedding</p>
            </div>
            <div className="testimonial-detail-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"Professional from start to finish. Amazing vocals and stage presence. Our corporate event was a huge success thanks to them!"</p>
              <p className="testimonial-author">- John D., Corporate Event</p>
            </div>
            <div className="testimonial-detail-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"The best tribute act we've ever seen! Authentic costumes, perfect sound, and incredible energy. Book them!"</p>
              <p className="testimonial-author">- Emma R., Birthday Party</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Book {artist.name}?</h2>
          <p>Get in touch today for availability and pricing</p>
          <div className="cta-buttons">
            <button onClick={handleBookNow} className="btn btn-large btn-cta-primary">
              📞 Request a Quote
            </button>
            <a href="tel:01418490333" className="btn btn-large btn-cta-secondary">
              ☎️ Call: 0141 849 0333
            </a>
          </div>
        </div>
      </section>

      {/* Related Artists */}
      {relatedArtists.length > 0 && (
        <section className="related-artists-section">
          <div className="section-container">
            <h3 className="section-title">Similar Acts You Might Like</h3>
            <div className="related-artists-grid">
              {relatedArtists.map(relatedArtist => (
                <Link 
                  key={relatedArtist.id} 
                  to={`/artist/${relatedArtist.id}`}
                  className="related-artist-card"
                >
                  <div className="related-image-wrapper">
                    <img 
                      src={relatedArtist.image} 
                      alt={relatedArtist.name}
                      onError={(e) => handleImageError(e, relatedArtist)}
                    />
                  </div>
                  <div className="related-artist-info">
                    <h4>{relatedArtist.name}</h4>
                    <p>{relatedArtist.tribute}</p>
                    {relatedArtist.rating && (
                      <div className="related-rating">
                        {renderStars(relatedArtist.rating)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ArtistDetail;

