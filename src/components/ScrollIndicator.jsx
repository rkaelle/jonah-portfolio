import { useState, useEffect, useRef } from 'react';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const initialScrollY = useRef(null);

  useEffect(() => {
    // Set initial scroll position after a short delay to ensure component is mounted
    const timer = setTimeout(() => {
      initialScrollY.current = window.scrollY;
    }, 200);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide if user has scrolled down significantly from initial position
      if (initialScrollY.current !== null && currentScrollY > initialScrollY.current + 30) {
        if (!hasScrolledRef.current) {
          hasScrolledRef.current = true;
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="scroll-indicator-wrapper">
      <div className="screenplay-content">
        <div 
          className="scroll-indicator-container"
          ref={containerRef}
        >
          <div className="scroll-indicator">
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;

