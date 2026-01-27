import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard';
import ArtistCardSkeleton from '../components/ArtistCardSkeleton';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SEO from '../components/SEO';
import { getAllArtists } from '../data/dataLoader';
import './Artists.css';

function Artists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load artists from CMS + hardcoded data
  useEffect(() => {
    const loadArtists = async () => {
      const startTime = Date.now();
      const minLoadingTime = 500; // Minimum 500ms to show skeleton
      
      try {
        const allArtists = await getAllArtists();
        // Filter out acts that are categorized as dinner speakers or themed nights
        const performanceActs = allArtists.filter(act => {
          const isDinnerSpeaker = act.act_category?.includes('dinner-speakers') || 
            act.categories?.some(cat => cat.toLowerCase().includes('dinner speaker'));
          const isThemedNight = act.act_category?.includes('themed-nights') || 
            act.categories?.some(cat => cat.toLowerCase().includes('themed night'));
          return !isDinnerSpeaker && !isThemedNight;
        });
        setArtists(performanceActs);
      } catch (error) {
        console.error('Error loading artists:', error);
      } finally {
        // Ensure minimum loading time for better UX
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadingTime - elapsed);
        setTimeout(() => {
          setLoading(false);
        }, remaining);
      }
    };

    loadArtists();
  }, []);

  // Filter artists based on genre, parent category, search, and tags
  const filteredArtists = artists.filter(artist => {
    // Genre filter - OR logic (matches if artist has ANY of the selected genres)
    const matchesGenre = selectedGenre.length === 0 || 
      selectedGenre.some(genreSlug => 
        artist.genre?.toLowerCase() === genreSlug.toLowerCase() ||
        artist.act_genre?.some(g => g === genreSlug) ||
        (Array.isArray(artist.act_genre) && artist.act_genre.includes(genreSlug))
      );
    
    // Parent category filter - OR logic (matches if artist has ANY of the selected categories)
    const matchesParentCategory = selectedParentCategory.length === 0 || 
      selectedParentCategory.some(categorySlug =>
        artist.parentCategory === categorySlug ||
        artist.act_category?.some(c => c === categorySlug) ||
        (Array.isArray(artist.act_category) && artist.act_category.includes(categorySlug))
      );
    
    // Search filter
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.tribute?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artist.genres && artist.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (artist.categories && artist.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (artist.tags && artist.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesGenre && matchesParentCategory && matchesSearch;
  });

  if (loading) {
    console.log('🔄 Showing skeleton loaders...');
    return (
      <div className="artists-page">
        <SEO 
          title="Performance Acts"
          description="Browse our extensive collection of professional tribute acts available for booking across Scotland."
          url="/artists"
          image="/images/scotbase-logo.png"
        />
        <section className="artists-hero">
          <h1>Browse Our Performance Acts</h1>
          <p>Find the perfect performance act for your event</p>
        </section>
        <div className="artists-container">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <div className="artists-layout">
            <aside className="filters-sidebar">
              <FilterBar 
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                selectedParentCategory={selectedParentCategory}
                onParentCategoryChange={setSelectedParentCategory}
                artists={[]}
              />
            </aside>
            <main className="artists-main-content">
              <div className="artists-grid">
                {[...Array(6)].map((_, index) => (
                  <ArtistCardSkeleton key={index} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artists-page">
      <SEO 
        title="Performance Acts"
        description="Browse our extensive collection of professional tribute acts available for booking across Scotland. Find the perfect entertainment for your wedding, corporate event, or private party."
        url="/artists"
        image="/images/scotbase-logo.png"
      />
      <section className="artists-hero">
        <h1>Browse Our Performance Acts</h1>
        <p>Find the perfect performance act for your event</p>
      </section>

      <div className="artists-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <div className="artists-layout">
          {/* Sidebar with Filters */}
          <aside className="filters-sidebar">
            <FilterBar 
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              selectedParentCategory={selectedParentCategory}
              onParentCategoryChange={setSelectedParentCategory}
              artists={artists}
            />
          </aside>

          {/* Main Content Area */}
          <main className="artists-main-content">
            {/* Results Count */}
            <div className="results-info">
              <p>
            Showing {filteredArtists.length} performance act{filteredArtists.length !== 1 ? 's' : ''}
            {(selectedGenre.length > 0 || selectedParentCategory.length > 0) && ' matching your filters'}
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
                <h3>No performance acts found</h3>
                <p>Try adjusting your search or filter criteria</p>
            {(selectedParentCategory.length > 0 || selectedGenre.length > 0) && (
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSelectedParentCategory([]);
                  setSelectedGenre([]);
                }}
              >
                Clear All Filters
              </button>
            )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Artists;

