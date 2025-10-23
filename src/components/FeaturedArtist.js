import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageHelper';
import './FeaturedArtist.css';

function FeaturedArtist({ artist }) {
  if (!artist) return null;

  return (
    <section className="featured-artist-section">
      <h2 className="featured-title">⭐ Featured Artist of the Month</h2>
      <div className="featured-artist">
        <div className="featured-image-container">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="featured-image"
            onError={(e) => handleImageError(e, artist)}
          />
        </div>
        <div className="featured-info">
          <h3 className="featured-artist-name">{artist.name}</h3>
          <p className="featured-artist-tribute">{artist.tribute}</p>
          <p className="featured-artist-description">{artist.description}</p>
          <div className="featured-details">
            <div className="featured-detail">
              <span className="detail-icon">🎵</span>
              <span>{artist.genre}</span>
            </div>
            <div className="featured-detail">
              <span className="detail-icon">📍</span>
              <span>{artist.location}</span>
            </div>
            <div className="featured-detail">
              <span className="detail-icon">💰</span>
              <span>{artist.price}</span>
            </div>
            <div className="featured-detail">
              <span className="detail-icon">✅</span>
              <span>{artist.bookingCount} successful bookings</span>
            </div>
          </div>
          <Link to={`/artist/${artist.id}`} className="btn btn-primary">
            View Full Profile
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArtist;

