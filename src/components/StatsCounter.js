import React, { useState, useEffect, useRef } from 'react';
import './StatsCounter.css';

function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { id: 1, end: 500, suffix: '+', label: 'Events Booked', icon: '🎉' },
    { id: 2, end: 50, suffix: '+', label: 'Professional Acts', icon: '🎭' },
    { id: 3, end: 15, suffix: '+', label: 'Years Experience', icon: '⭐' },
    { id: 4, end: 98, suffix: '%', label: 'Client Satisfaction', icon: '❤️' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const AnimatedNumber = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="stats-container">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">
              <AnimatedNumber end={stat.end} suffix={stat.suffix} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsCounter;

