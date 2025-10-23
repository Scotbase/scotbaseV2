import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageHelper';
import './ArtistCard.css';

function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`} className="artist-card-link">
      <div className="artist-card">
        <div className="artist-image-container">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="artist-image"
            onError={(e) => handleImageError(e, artist)}
          />
          {artist.featured && <span className="featured-badge">⭐ Featured</span>}
          <div className="availability-badge" data-status={artist.availability.toLowerCase()}>
            {artist.availability}
          </div>
        </div>
        <div className="artist-info">
          <h3 className="artist-name">{artist.name}</h3>
          <p className="artist-tribute">{artist.tribute}</p>
          <div className="artist-meta">
            <span className="artist-genre">🎵 {artist.genre}</span>
            <span className="artist-location">📍 {artist.location}</span>
          </div>
          <div className="artist-price">{artist.price}</div>
          <div className="artist-bookings">
            {artist.bookingCount} bookings
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArtistCard;

