import React from 'react';
import './ArtistCardSkeleton.css';

function ArtistCardSkeleton() {
  return (
    <div className="artist-card-skeleton">
      <div className="skeleton-image-container">
        <div className="skeleton-image"></div>
      </div>
      <div className="skeleton-info">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
        <div className="skeleton-rating">
          <div className="skeleton-stars"></div>
        </div>
        <div className="skeleton-line skeleton-description"></div>
        <div className="skeleton-line skeleton-description short"></div>
        <div className="skeleton-meta">
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
        </div>
      </div>
    </div>
  );
}

export default ArtistCardSkeleton;

