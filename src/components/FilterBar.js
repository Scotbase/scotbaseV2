import React, { useState, useEffect } from 'react';
import { fetchTaxonomies } from '../utils/taxonomyHelper';
import './FilterBar.css';

function FilterBar({ selectedTags, onTagsChange, selectedParentCategory, onParentCategoryChange, selectedGenre, onGenreChange, artists }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showTagFilters, setShowTagFilters] = useState(false);
  const [showGenreFilters, setShowGenreFilters] = useState(false); // Collapsed by default
  const [showCategoryFilters, setShowCategoryFilters] = useState(false); // Collapsed by default
  const [showAllFilters, setShowAllFilters] = useState(false); // Master toggle
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
        console.error('Error loading taxonomies:', error);
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

  // Extract all unique tags by category
  const getTagsByCategory = () => {
    const allTags = artists.flatMap(artist => artist.tags || []);
    
    return {
      genre: [...new Set(allTags.filter(tag => 
        ['rock', 'pop', 'soul', 'jazz', 'blues', 'ska', 'britpop', 'motown', 'disco'].includes(tag)
      ))].sort(),
      
      era: [...new Set(allTags.filter(tag => 
        ['60s', '70s', '80s', '90s', '00s', '10s'].includes(tag)
      ))].sort(),
      
      type: [...new Set(allTags.filter(tag => 
        ['solo', 'duo', 'trio', 'quartet', 'group'].includes(tag)
      ))].sort(),
      
      gender: [...new Set(allTags.filter(tag => 
        ['male', 'female', 'mixed'].includes(tag)
      ))].sort(),
      
      style: [...new Set(allTags.filter(tag => 
        ['high-energy', 'ballads', 'dance', 'classic-rock', 'retro', 'boyband', 'girlband'].includes(tag)
      ))].sort()
    };
  };

  const tagCategories = getTagsByCategory();

  const categoryLabels = {
    genre: 'Genre',
    era: 'Era',
    type: 'Act Type',
    gender: 'Gender',
    style: 'Style'
  };

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Filter genres by search
  const filteredGenres = genres.filter(genre =>
    genre.name.toLowerCase().includes(genreSearch.toLowerCase())
  );

  // Filter categories by search
  const filteredCategories = parentCategories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Count active filters
  const activeFilterCount = 
    (selectedGenre ? 1 : 0) + 
    (selectedParentCategory ? 1 : 0) + 
    selectedTags.length;

  // Clear all filters
  const handleClearAllFilters = () => {
    onGenreChange(null);
    onParentCategoryChange(null);
    onTagsChange([]);
    setGenreSearch('');
    setCategorySearch('');
  };

  return (
    <div className="filter-bar">
      {/* Master Filter Toggle Button */}
      <div className="filter-master-toggle">
        <button 
          className={`filter-toggle-btn ${showAllFilters ? 'active' : ''}`}
          onClick={() => setShowAllFilters(!showAllFilters)}
        >
          <span className="filter-icon">🔍</span>
          <span className="filter-text">Filters</span>
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
          <span className="arrow">{showAllFilters ? '▼' : '▶'}</span>
        </button>
        
        {activeFilterCount > 0 && (
          <button 
            className="clear-all-filters-btn"
            onClick={handleClearAllFilters}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="active-filters-display">
          <span className="active-filters-label">Active filters:</span>
          {selectedGenre && (
            <span className="active-filter-chip">
              Genre: {genres.find(g => g.slug === selectedGenre)?.name}
              <button onClick={() => onGenreChange(null)}>×</button>
            </span>
          )}
          {selectedParentCategory && (
            <span className="active-filter-chip">
              Category: {parentCategories.find(c => (c.slug || c.name) === selectedParentCategory)?.name}
              <button onClick={() => onParentCategoryChange(null)}>×</button>
            </span>
          )}
          {selectedTags.map(tag => (
            <span key={tag} className="active-filter-chip">
              {tag}
              <button onClick={() => handleTagToggle(tag)}>×</button>
            </span>
          ))}
        </div>
      )}

      {showAllFilters && (
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
                  <div className="filter-buttons-grid">
                    <button
                      className={`filter-btn ${!selectedGenre ? 'selected' : ''}`}
                      onClick={() => onGenreChange(null)}
                    >
                      All Genres
                    </button>
                    {filteredGenres.map(genre => (
                      <button
                        key={genre.id}
                        className={`filter-btn ${selectedGenre === genre.slug ? 'selected' : ''}`}
                        onClick={() => onGenreChange(genre.slug)}
                      >
                        {genre.name} {genre.count > 0 && `(${genre.count})`}
                      </button>
                    ))}
                  </div>
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
                  <div className="filter-buttons-grid">
                    <button
                      className={`filter-btn ${!selectedParentCategory ? 'selected' : ''}`}
                      onClick={() => onParentCategoryChange(null)}
                    >
                      All Acts
                    </button>
                    {filteredCategories.map(category => (
                      <button
                        key={category.id || category.name}
                        className={`filter-btn ${selectedParentCategory === (category.slug || category.name) ? 'selected' : ''}`}
                        onClick={() => onParentCategoryChange(category.slug || category.name)}
                      >
                        {category.name} {category.count > 0 && `(${category.count})`}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tag Filters Section (existing) */}
          <div className="filter-section">
            <button 
              className="filter-section-header" 
              onClick={() => setShowTagFilters(!showTagFilters)}
                  >
              <h3>Advanced Tag Filters</h3>
              <span className="arrow">{showTagFilters ? '▼' : '▶'}</span>
            </button>

            {showTagFilters && (
              <div style={{ padding: '1rem 1.5rem' }}>
                {/* Selected Tags Display */}
                {selectedTags.length > 0 && (
                  <div className="selected-tags" style={{ marginBottom: '1rem' }}>
                    {selectedTags.map(tag => (
                      <span key={tag} className="selected-tag">
                        {tag}
                        <button 
                          className="remove-tag-btn"
                          onClick={() => handleTagToggle(tag)}
                          aria-label={`Remove ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Filter Categories */}
                <div className="filter-categories">
                  {Object.entries(tagCategories).map(([category, tags]) => (
                    tags.length > 0 && (
                      <div key={category} className="filter-category">
                        <button
                          className={`category-header ${expandedCategory === category ? 'expanded' : ''}`}
                          onClick={() => toggleCategory(category)}
                        >
                          <span>{categoryLabels[category]}</span>
                          <span className="arrow">{expandedCategory === category ? '▼' : '▶'}</span>
                        </button>
                        
                        {expandedCategory === category && (
                          <div className="tag-list">
                            {tags.map(tag => (
                              <button
                                key={tag}
                                className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                onClick={() => handleTagToggle(tag)}
                              >
                                <span className="tag-checkbox">
                                  {selectedTags.includes(tag) ? '☑' : '☐'}
                                </span>
                                <span className="tag-name">{tag}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;

