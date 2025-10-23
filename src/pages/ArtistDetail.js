import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { artists } from '../data/artists';
import { handleImageError } from '../utils/imageHelper';
import './ArtistDetail.css';

function ArtistDetail() {
  const { id } = useParams();
  const artist = artists.find(a => a.id === parseInt(id));

  if (!artist) {
    return (
      <div className="artist-not-found">
        <h2>Artist Not Found</h2>
        <p>Sorry, we couldn't find the artist you're looking for.</p>
        <Link to="/artists" className="btn btn-primary">Back to Artists</Link>
      </div>
    );
  }

  const relatedArtists = artists
    .filter(a => a.genre === artist.genre && a.id !== artist.id)
    .slice(0, 3);

  return (
    <div className="artist-detail-page">
      <div className="artist-detail-hero">
        <div className="artist-detail-image-container">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="artist-detail-image"
            onError={(e) => handleImageError(e, artist)}
          />
          {artist.featured && <span className="featured-badge-large">⭐ Featured Artist</span>}
        </div>
        <div className="artist-detail-info">
          <h1 className="artist-detail-name">{artist.name}</h1>
          <h2 className="artist-detail-tribute">{artist.tribute}</h2>
          
          <div className="artist-detail-meta">
            <div className="meta-item">
              <span className="meta-icon">🎵</span>
              <div>
                <strong>Genre</strong>
                <p>{artist.genre}</p>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <div>
                <strong>Location</strong>
                <p>{artist.location}</p>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">💰</span>
              <div>
                <strong>Price Range</strong>
                <p>{artist.price}</p>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-icon">✅</span>
              <div>
                <strong>Availability</strong>
                <p>{artist.availability}</p>
              </div>
            </div>
          </div>

          <div className="booking-stats">
            <div className="stat">
              <div className="stat-number">{artist.bookingCount}</div>
              <div className="stat-label">Successful Bookings</div>
            </div>
          </div>

          <p className="artist-detail-description">{artist.description}</p>

          <div className="action-buttons">
            <Link to="/contact" className="btn btn-primary">
              Book This Artist
            </Link>
            <Link to="/artists" className="btn btn-secondary">
              Back to All Artists
            </Link>
          </div>
        </div>
      </div>

      {relatedArtists.length > 0 && (
        <section className="related-artists-section">
          <h3>Similar Artists</h3>
          <div className="related-artists-grid">
            {relatedArtists.map(relatedArtist => (
              <Link 
                key={relatedArtist.id} 
                to={`/artist/${relatedArtist.id}`}
                className="related-artist-card"
              >
                <img 
                  src={relatedArtist.image} 
                  alt={relatedArtist.name}
                  onError={(e) => handleImageError(e, relatedArtist)}
                />
                <div className="related-artist-info">
                  <h4>{relatedArtist.name}</h4>
                  <p>{relatedArtist.tribute}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ArtistDetail;

