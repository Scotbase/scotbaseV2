import React, { useState } from 'react';
import ArtistCard from '../components/ArtistCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { artists } from '../data/artists';
import './Artists.css';

function Artists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Filter artists based on search and tags
  const filteredArtists = artists.filter(artist => {
    // Search filter
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.tribute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artist.tags && artist.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Tag filter - artist must have ALL selected tags
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(selectedTag => 
        artist.tags && artist.tags.includes(selectedTag)
      );
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="artists-page">
      <section className="artists-hero">
        <h1>Browse Our Tribute Acts</h1>
        <p>Find the perfect tribute act for your event</p>
      </section>

      <div className="artists-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {/* Tag-based Filter */}
        <FilterBar 
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          artists={artists}
        />

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredArtists.length} tribute act{filteredArtists.length !== 1 ? 's' : ''}
            {selectedTags.length > 0 && ` matching ${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''}`}
          </p>
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
            <h3>No tribute acts found</h3>
            <p>Try adjusting your search or filter criteria</p>
            {selectedTags.length > 0 && (
              <button 
                className="clear-filters-btn"
                onClick={() => setSelectedTags([])}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Artists;

