import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageHelper';
import { decodeHtmlEntitiesSimple } from '../utils/htmlDecoder';
import './FeaturedArtist.css';

function FeaturedArtist({ artist }) {
  if (!artist) return null;

  const handleVideoClick = () => {
    if (artist.videoUrl) {
      window.open(artist.videoUrl, '_blank');
    }
  };

  const handleEnquiryClick = () => {
    window.location.href = `/contact?artist=${encodeURIComponent(artist.name)}`;
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

  return (
    <section className="featured-artist-section">
      <h2 className="featured-title">⭐ Featured Act of the Month</h2>
      <div className="featured-artist">
        <div className="featured-image-container">
          <img 
            src={artist.image} 
            alt={decodeHtmlEntitiesSimple(artist.name)} 
            className="featured-image"
            onError={(e) => handleImageError(e, artist)}
          />
          {/* Video indicator */}
          {artist.videoUrl && (
            <div className="featured-video-indicator" onClick={handleVideoClick}>
              <svg className="featured-play-icon" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
        </div>
        <div className="featured-info">
          <h3 className="featured-artist-name">{decodeHtmlEntitiesSimple(artist.name)}</h3>
          <p className="featured-artist-tribute">{decodeHtmlEntitiesSimple(artist.tribute)}</p>
          
          {/* Star rating */}
          {artist.rating && (
            <div className="featured-rating">
              {renderStars(artist.rating)}
              <span className="featured-rating-text">({artist.rating}/5)</span>
            </div>
          )}

          <p className="featured-artist-description">{decodeHtmlEntitiesSimple(artist.description)}</p>
          <div className="featured-details">
            <div className="featured-detail">
              <span className="detail-icon">🎵</span>
              <span>{artist.genre}</span>
            </div>
            <div className="featured-detail">
              <span className="detail-icon">✅</span>
              <span>{artist.bookingCount} successful bookings</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="featured-action-buttons">
            <Link to={`/artist/${artist.id}`} className="btn btn-primary">
              View Full Profile
            </Link>
            {artist.videoUrl && (
              <button onClick={handleVideoClick} className="btn btn-video">
                🎬 Watch Video
              </button>
            )}
            <button onClick={handleEnquiryClick} className="btn btn-secondary">
              Quick Enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArtist;

