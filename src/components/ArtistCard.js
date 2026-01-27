import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageHelper';
import { decodeHtmlEntitiesSimple } from '../utils/htmlDecoder';
import './ArtistCard.css';

function ArtistCard({ artist }) {
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
    <Link to={`/artist/${artist.id}`} className="artist-card-link">
      <div className="artist-card">
        <div className="artist-image-container">
          <img 
            src={artist.image} 
            alt={decodeHtmlEntitiesSimple(artist.name)} 
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
        </div>

        <div className="artist-info">
          <h3 className="artist-name">{decodeHtmlEntitiesSimple(artist.name)}</h3>
          <p className="artist-tribute">{decodeHtmlEntitiesSimple(artist.tribute)}</p>
          
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
              {(() => {
                const decoded = decodeHtmlEntitiesSimple(artist.description);
                return decoded.length > 120 
                  ? `${decoded.substring(0, 120)}...` 
                  : decoded;
              })()}
            </p>
          )}

          <div className="artist-meta">
            <span className="artist-genre">🎵 {artist.genre}</span>
          </div>

          {/* Genre tags */}
          {artist.tags && artist.tags.length > 0 && (
            <div className="genre-tags">
              {artist.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="genre-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ArtistCard;

