"use client";

import { useEffect, useRef } from 'react';
import styles from './HeroBackgroundCSS.module.css';

export default function HeroBackgroundCSS() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic connection line animation
    const createConnection = () => {
      if (!containerRef.current) return;
      
      const connection = document.createElement('div');
      connection.className = styles.connection;
      
      // Random positions around the globe
      const startX = 50 + (Math.random() - 0.5) * 40;
      const startY = 50 + (Math.random() - 0.5) * 40;
      const endX = 50 + (Math.random() - 0.5) * 40;
      const endY = 50 + (Math.random() - 0.5) * 40;
      
      connection.style.setProperty('--start-x', `${startX}%`);
      connection.style.setProperty('--start-y', `${startY}%`);
      connection.style.setProperty('--end-x', `${endX}%`);
      connection.style.setProperty('--end-y', `${endY}%`);
      connection.style.animationDelay = `${Math.random() * 2}s`;
      
      containerRef.current.appendChild(connection);
      
      // Remove after animation
      setTimeout(() => {
        if (containerRef.current?.contains(connection)) {
          containerRef.current.removeChild(connection);
        }
      }, 3000);
    };

    // Create initial connections
    for (let i = 0; i < 8; i++) {
      setTimeout(createConnection, i * 400);
    }

    // Continue creating connections
    const interval = setInterval(createConnection, 300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className={styles.heroBackground}>
      {/* Animated Globe */}
      <div className={styles.globe}>
        <div className={styles.globeInner}></div>
      </div>
      
      {/* Floating Study Icons */}
      <div className={styles.studyIcons}>
        {['📚', '💻', '{}', 'π', '🤖'].map((icon, index) => (
          <div
            key={index}
            className={styles.studyIcon}
            style={{
              animationDelay: `${index * 0.5}s`,
              left: `${20 + (index * 15)}%`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>
      
      {/* Floating Particles */}
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}