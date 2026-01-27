import React, { useState, useEffect } from 'react';
import { fetchTaxonomies } from '../utils/taxonomyHelper';
import './FilterBar.css';

function FilterBar({ selectedParentCategory, onParentCategoryChange, selectedGenre, onGenreChange, artists }) {
  const [showGenreFilters, setShowGenreFilters] = useState(true); // Expanded by default
  const [showCategoryFilters, setShowCategoryFilters] = useState(true); // Expanded by default
  const [showMoreGenres, setShowMoreGenres] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch taxonomies on mount
  useEffect(() => {
    const loadTaxonomies = async () => {
      try {
        const { genres: fetchedGenres, categories: fetchedCategories } = await fetchTaxonomies();
        setGenres(fetchedGenres);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading taxonomies from WordPress:', error);
      }
    };

    loadTaxonomies();
  }, []);

  // Get all unique parent categories (fallback to local data if API fails)
  const getParentCategories = () => {
    if (categories.length > 0) {
      return categories;
    }
    // Fallback to extracting from artists
    const localCategories = artists
      .map(artist => artist.parentCategory)
      .filter(cat => cat); // Remove undefined/null
    return [...new Set(localCategories)].sort().map(name => ({ name }));
  };

  const parentCategories = getParentCategories();

  // Filter genres by search
  const filteredGenres = genres.filter(genre =>
    genre.name.toLowerCase().includes(genreSearch.toLowerCase())
  );

  // Calculate actual counts for genres based on current artists
  const genresWithCounts = filteredGenres.map(genre => {
    const count = artists.filter(artist => 
      artist.genre?.toLowerCase() === genre.slug.toLowerCase() ||
      artist.act_genre?.some(g => g === genre.slug) ||
      (Array.isArray(artist.act_genre) && artist.act_genre.includes(genre.slug))
    ).length;
    return { ...genre, actualCount: count };
  });

  // Filter categories by search
  const filteredCategories = parentCategories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Calculate actual counts for categories based on current artists
  const categoriesWithCounts = filteredCategories.map(category => {
    const count = artists.filter(artist =>
      artist.parentCategory === category.slug ||
      artist.act_category?.some(c => c === category.slug) ||
      (Array.isArray(artist.act_category) && artist.act_category.includes(category.slug))
    ).length;
    return { ...category, actualCount: count };
  });

  // Handle genre toggle (multi-select)
  const handleGenreToggle = (genreSlug) => {
    const newGenres = selectedGenre.includes(genreSlug)
      ? selectedGenre.filter(g => g !== genreSlug)
      : [...selectedGenre, genreSlug];
    onGenreChange(newGenres);
  };

  // Handle category toggle (multi-select)
  const handleCategoryToggle = (categorySlug) => {
    const newCategories = selectedParentCategory.includes(categorySlug)
      ? selectedParentCategory.filter(c => c !== categorySlug)
      : [...selectedParentCategory, categorySlug];
    onParentCategoryChange(newCategories);
  };

  // Count active filters
  const activeFilterCount = 
    selectedGenre.length + 
    selectedParentCategory.length;

  // Clear all filters
  const handleClearAllFilters = () => {
    onGenreChange([]);
    onParentCategoryChange([]);
    setGenreSearch('');
    setCategorySearch('');
  };

  // Helper function to get items to display based on show more state
  const getItemsToDisplay = (items, showMore, limit = 5) => {
    if (showMore) return items;
    return items.slice(0, limit);
  };

  // Helper function to check if scrollbar should appear (more than 10 items)
  const shouldShowScrollbar = (items) => items.length > 10;

  return (
    <div className="filter-bar sidebar-filter-bar">
      {/* Filter Header */}
      <div className="filter-header-sidebar">
        <h2 className="filter-title">Filters</h2>
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="active-filters-display">
          <span className="active-filters-label">Active:</span>
          <div className="active-filters-chips">
            {selectedGenre.map(genreSlug => {
              const genre = genres.find(g => g.slug === genreSlug);
              return genre ? (
                <span key={genreSlug} className="active-filter-chip">
                  {genre.name}
                  <button onClick={() => handleGenreToggle(genreSlug)}>×</button>
                </span>
              ) : null;
            })}
            {selectedParentCategory.map(categorySlug => {
              const category = parentCategories.find(c => (c.slug || c.name) === categorySlug);
              return category ? (
                <span key={categorySlug} className="active-filter-chip">
                  {category.name}
                  <button onClick={() => handleCategoryToggle(categorySlug)}>×</button>
                </span>
              ) : null;
            })}
          </div>
          <button 
            className="clear-all-filters-btn"
            onClick={handleClearAllFilters}
          >
            Clear All
          </button>
        </div>
      )}

      <div className="filter-sections">
          {/* Genre Filter Section */}
          {genres.length > 0 && (
            <div className="filter-section">
              <button 
                className={`filter-section-header ${showGenreFilters ? 'expanded' : ''}`}
                onClick={() => setShowGenreFilters(!showGenreFilters)}
              >
                <h3>Browse by Genre</h3>
                <span className="arrow">{showGenreFilters ? '▼' : '▶'}</span>
              </button>
              
              {showGenreFilters && (
                <>
                  <div className="filter-search-box">
                    <input
                      type="text"
                      placeholder="🔍 Search genres..."
                      value={genreSearch}
                      onChange={(e) => setGenreSearch(e.target.value)}
                      className="filter-search-input"
                    />
                  </div>
                  <div className={`filter-options-container ${shouldShowScrollbar(genresWithCounts) && showMoreGenres ? 'scrollable' : ''}`}>
                    <div className="filter-buttons-list">
                      {getItemsToDisplay(genresWithCounts, showMoreGenres, 5).map(genre => (
                        <button
                          key={genre.id}
                          className={`filter-btn ${selectedGenre.includes(genre.slug) ? 'selected' : ''}`}
                          onClick={() => handleGenreToggle(genre.slug)}
                        >
                          <span className="filter-checkbox">
                            {selectedGenre.includes(genre.slug) ? '☑' : '☐'}
                          </span>
                          {genre.name} {genre.actualCount > 0 && `(${genre.actualCount})`}
                        </button>
                      ))}
                    </div>
                  </div>
                  {genresWithCounts.length > 5 && (
                    <button
                      className="show-more-btn"
                      onClick={() => setShowMoreGenres(!showMoreGenres)}
                    >
                      {showMoreGenres ? 'Show Less' : `Show More (${genresWithCounts.length - 5} more)`}
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* Category Filter Section */}
          {parentCategories.length > 0 && (
            <div className="filter-section">
              <button 
                className={`filter-section-header ${showCategoryFilters ? 'expanded' : ''}`}
                onClick={() => setShowCategoryFilters(!showCategoryFilters)}
              >
                <h3>Browse by Category</h3>
                <span className="arrow">{showCategoryFilters ? '▼' : '▶'}</span>
              </button>
              
              {showCategoryFilters && (
                <>
                  <div className="filter-search-box">
                    <input
                      type="text"
                      placeholder="🔍 Search categories..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="filter-search-input"
                    />
                  </div>
                  <div className={`filter-options-container ${shouldShowScrollbar(categoriesWithCounts) && showMoreCategories ? 'scrollable' : ''}`}>
                    <div className="filter-buttons-list">
                      {getItemsToDisplay(categoriesWithCounts, showMoreCategories, 5).map(category => (
                        <button
                          key={category.id || category.name}
                          className={`filter-btn ${selectedParentCategory.includes(category.slug || category.name) ? 'selected' : ''}`}
                          onClick={() => handleCategoryToggle(category.slug || category.name)}
                        >
                          <span className="filter-checkbox">
                            {selectedParentCategory.includes(category.slug || category.name) ? '☑' : '☐'}
                          </span>
                          {category.name} {category.actualCount > 0 && `(${category.actualCount})`}
                        </button>
                      ))}
                    </div>
                  </div>
                  {categoriesWithCounts.length > 5 && (
                    <button
                      className="show-more-btn"
                      onClick={() => setShowMoreCategories(!showMoreCategories)}
                    >
                      {showMoreCategories ? 'Show Less' : `Show More (${categoriesWithCounts.length - 5} more)`}
                    </button>
                  )}
                </>
              )}
            </div>
          )}

        </div>
    </div>
  );
}

export default FilterBar;

