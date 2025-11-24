import { useState, useEffect, useRef } from 'react';
import './FadeToBlack.css';

const FadeToBlack = ({ onComplete }) => {
  const [fadeProgress, setFadeProgress] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const onCompleteCalledRef = useRef(false);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Scroll-based fade effect - triggers when section is visible
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on section position
      // Start fading when section is in viewport
      // Progress from 0 to 1 as user scrolls past the section
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const fadeStart = windowHeight * 0.5; // Start fading when section is 50% from top
      const fadeEnd = -windowHeight * 0.3; // Complete fade when section is 30% above viewport
      
      let progress = 0;
      if (sectionTop < fadeStart) {
        progress = Math.max(0, Math.min(1, (fadeStart - sectionTop) / (fadeStart - fadeEnd)));
      }
      
      setFadeProgress(progress);

      // Hide arrow when fade starts (at 10% progress)
      if (progress > 0.1 && showArrow) {
        setShowArrow(false);
      }

      // Complete when fade is done - trigger earlier to ensure contact section appears
      // Trigger when section bottom is near viewport top or progress is high
      if ((progress >= 0.8 || sectionBottom < windowHeight * 0.2) && !onCompleteCalledRef.current) {
        onCompleteCalledRef.current = true;
        if (onComplete) {
          onComplete();
        }
      }
      
      // Fallback: if user scrolls way past, force completion
      if (sectionBottom < -windowHeight && !onCompleteCalledRef.current) {
        onCompleteCalledRef.current = true;
        if (onComplete) {
          onComplete();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, showArrow, onComplete]);

  return (
    <>
      <div className="fade-to-black-section" ref={sectionRef}>
        <div className="screenplay-content">
          <div className="fade-to-black-text">
            <strong>FADE TO BLACK</strong>
          </div>
          {showArrow && (
            <div className="scroll-indicator">
              <span className="scroll-arrow">↓</span>
            </div>
          )}
        </div>
      </div>
      <div 
        className="black-overlay" 
        style={{ opacity: fadeProgress }}
      ></div>
    </>
  );
};

export default FadeToBlack;
