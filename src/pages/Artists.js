import React, { useState } from 'react';
import ArtistCard from '../components/ArtistCard';
import SearchBar from '../components/SearchBar';
import { artists } from '../data/artists';
import './Artists.css';

function Artists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Get unique genres
  const genres = ['All', ...new Set(artists.map(artist => artist.genre))];

  // Filter artists based on search and genre
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.tribute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = selectedGenre === 'All' || artist.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="artists-page">
      <section className="artists-hero">
        <h1>Browse Our Artists</h1>
        <p>Find the perfect tribute act for your event</p>
      </section>

      <div className="artists-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {/* Genre Filter */}
        <div className="genre-filter">
          <label>Filter by Genre:</label>
          <div className="genre-buttons">
            {genres.map(genre => (
              <button
                key={genre}
                className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Artists Grid */}
        {filteredArtists.length > 0 ? (
          <div className="artists-grid">
            {filteredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No artists found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Artists;

