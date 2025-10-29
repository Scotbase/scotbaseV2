import React, { useState } from 'react';
import './FilterBar.css';

function FilterBar({ selectedTags, onTagsChange, artists }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

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

  const handleClearAll = () => {
    onTagsChange([]);
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h3>Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All ({selectedTags.length})
          </button>
        )}
      </div>

      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="selected-tags">
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
  );
}

export default FilterBar;

