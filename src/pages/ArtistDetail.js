import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtistById, getAllArtists } from '../data/dataLoader';
import { handleImageError } from '../utils/imageHelper';
import './ArtistDetail.css';

function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when artist changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
        <Link to="/artists" className="btn btn-primary">Back to Tribute Acts</Link>
      </div>
    );
  }

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
              <span className="meta-icon">✅</span>
              <div>
                <strong>Availability</strong>
                <p>{artist.availability}</p>
              </div>
            </div>
          </div>

          <p className="artist-detail-description">{artist.description}</p>

          <div className="action-buttons">
            <Link to="/contact" className="btn btn-primary">
              Book This Act
            </Link>
            <Link to="/artists" className="btn btn-secondary">
              Back to All Acts
            </Link>
          </div>
        </div>
      </div>

      {relatedArtists.length > 0 && (
        <section className="related-artists-section">
          <h3>Similar Acts</h3>
          <div className="related-artists-grid">
            {relatedArtists.map(relatedArtist => (
              <Link 
                key={relatedArtist.id} 
                to={`/artist/${relatedArtist.id}`}
                className="related-artist-card"
              >
                <div>
                  <img 
                    src={relatedArtist.image} 
                    alt={relatedArtist.name}
                    onError={(e) => handleImageError(e, relatedArtist)}
                  />
                </div>
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

