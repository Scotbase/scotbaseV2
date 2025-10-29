import React, { useState, useEffect } from 'react';
import { fetchActFromCMS } from '../utils/cmsHelper';
import './CMSTestAct.css';

function CMSTestAct() {
  const [act, setAct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAct = async () => {
      try {
        // Try to fetch the ABBA act we created
        const data = await fetchActFromCMS('abba-a-rival-quartet');
        setAct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAct();
  }, []);

  if (loading) {
    return (
      <div className="cms-test-act">
        <div className="cms-banner">
          <span className="cms-badge">🔄 Loading from CMS...</span>
        </div>
      </div>
    );
  }

  if (error || !act) {
    return (
      <div className="cms-test-act">
        <div className="cms-banner error">
          <span className="cms-badge">⚠️ CMS Act Not Found</span>
          <p>Make sure to run: npm install gray-matter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cms-test-act">
      <div className="cms-banner success">
        <span className="cms-badge">✅ Loaded from Decap CMS</span>
      </div>
      <div className="cms-act-card">
        <div className="cms-act-image">
          <img src={act.image} alt={act.name} />
          {act.featured && <span className="featured-badge">⭐ Featured</span>}
        </div>
        <div className="cms-act-info">
          <h3>{act.name}</h3>
          <p className="tribute">{act.tribute}</p>
          <div className="meta">
            <span>🎵 {act.genre}</span>
            <span>📍 {act.location}</span>
            <span>💰 {act.price}</span>
          </div>
          <p className="description">{act.description}</p>
          <div className="tags">
            {act.tags && act.tags.map((tag, idx) => (
              <span key={idx} className="tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CMSTestAct;

