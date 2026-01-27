import React from 'react';
import './ArtistDetailSkeleton.css';

function ArtistDetailSkeleton() {
  return (
    <div className="artist-detail-skeleton">
      {/* Hero Section Skeleton */}
      <div className="skeleton-hero">
        <div className="skeleton-hero-image"></div>
        <div className="skeleton-hero-content">
          <div className="skeleton-breadcrumb"></div>
          <div className="skeleton-hero-title"></div>
          <div className="skeleton-hero-subtitle"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="skeleton-content">
        <div className="skeleton-section">
          <div className="skeleton-section-title"></div>
          <div className="skeleton-text-lines">
            <div className="skeleton-text-line"></div>
            <div className="skeleton-text-line"></div>
            <div className="skeleton-text-line short"></div>
          </div>
        </div>

        <div className="skeleton-section">
          <div className="skeleton-section-title"></div>
          <div className="skeleton-features">
            <div className="skeleton-feature"></div>
            <div className="skeleton-feature"></div>
            <div className="skeleton-feature"></div>
          </div>
        </div>

        <div className="skeleton-section">
          <div className="skeleton-section-title"></div>
          <div className="skeleton-tags">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetailSkeleton;

