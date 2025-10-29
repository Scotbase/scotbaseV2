import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { getAllArtists } from '../data/dataLoader';
import './Artists.css';

function Artists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load artists from CMS + hardcoded data
  useEffect(() => {
    const loadArtists = async () => {
      try {
        const allArtists = await getAllArtists();
        setArtists(allArtists);
      } catch (error) {
        console.error('Error loading artists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  // Filter artists based on parent category, search, and tags
  const filteredArtists = artists.filter(artist => {
    // Parent category filter
    const matchesParentCategory = !selectedParentCategory || 
      artist.parentCategory === selectedParentCategory;
    
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
    
    return matchesParentCategory && matchesSearch && matchesTags;
  });

  if (loading) {
    return (
      <div className="artists-page">
        <section className="artists-hero">
          <h1>Browse Our Tribute Acts</h1>
          <p>Loading acts from CMS...</p>
        </section>
        <div className="artists-container">
          <div className="loading-spinner">
            <p>🎵 Loading tribute acts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artists-page">
      <section className="artists-hero">
        <h1>Browse Our Tribute Acts</h1>
        <p>Find the perfect tribute act for your event</p>
      </section>

      <div className="artists-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {/* Category and Tag Filters */}
        <FilterBar 
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          selectedParentCategory={selectedParentCategory}
          onParentCategoryChange={setSelectedParentCategory}
          artists={artists}
        />

        {/* Results Count */}
        <div className="results-info">
          <p>
            Showing {filteredArtists.length} {
              selectedParentCategory 
                ? (filteredArtists.length === 1 ? selectedParentCategory.replace(/s$/, '') : selectedParentCategory)
                : `tribute act${filteredArtists.length !== 1 ? 's' : ''}`
            }
            {selectedTags.length > 0 && ` with ${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''}`}
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
            {(selectedTags.length > 0 || selectedParentCategory) && (
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedTags([]);
                  setSelectedParentCategory(null);
                }}
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

