import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageHelper';
import './ArtistCard.css';

function ArtistCard({ artist }) {
  const handleVideoClick = (e) => {
    e.preventDefault();
    if (artist.videoUrl) {
      window.open(artist.videoUrl, '_blank');
    }
  };

  const handleEnquiryClick = (e) => {
    e.preventDefault();
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
    <div className="artist-card-link">
      <div className="artist-card">
        <div className="artist-image-container">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="artist-image"
            onError={(e) => handleImageError(e, artist)}
          />
          
          {/* Video indicator */}
          {artist.videoUrl && (
            <div className="video-indicator">
              <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
          
          {artist.featured && <span className="featured-badge">⭐ Featured</span>}
          <div className="availability-badge" data-status={artist.availability.toLowerCase()}>
            {artist.availability}
          </div>

          {/* Hover overlay with actions */}
          <div className="card-overlay">
            <div className="overlay-buttons">
              <Link to={`/artist/${artist.id}`} className="overlay-btn overlay-btn-primary">
                View Details
              </Link>
              {artist.videoUrl && (
                <button onClick={handleVideoClick} className="overlay-btn overlay-btn-video">
                  🎬 Watch Video
                </button>
              )}
              <button onClick={handleEnquiryClick} className="overlay-btn overlay-btn-secondary">
                Quick Enquiry
              </button>
            </div>
          </div>
        </div>

        <div className="artist-info">
          <h3 className="artist-name">{artist.name}</h3>
          <p className="artist-tribute">{artist.tribute}</p>
          
          {/* Star rating */}
          {artist.rating && (
            <div className="artist-rating">
              {renderStars(artist.rating)}
              <span className="rating-text">({artist.rating}/5)</span>
            </div>
          )}

          {/* Description preview */}
          {artist.description && (
            <p className="artist-description">
              {artist.description.length > 120 
                ? `${artist.description.substring(0, 120)}...` 
                : artist.description}
            </p>
          )}

          <div className="artist-meta">
            <span className="artist-genre">🎵 {artist.genre}</span>
            <span className="artist-location">📍 {artist.location}</span>
          </div>

          {/* Genre tags */}
          {artist.tags && artist.tags.length > 0 && (
            <div className="genre-tags">
              {artist.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="genre-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Price display */}
          {artist.price && (
            <div className="artist-price-display">
              <span className="price-label">From</span> {artist.price}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;

