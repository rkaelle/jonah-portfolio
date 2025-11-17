import { useState, useEffect, useRef } from 'react';
import './FadeToBlack.css';

const FadeToBlack = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [startFade, setStartFade] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const fullText = 'FADE TO BLACK.';

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
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

  // Type the text when visible
  useEffect(() => {
    if (!isVisible) return;

    if (text.length < fullText.length) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else {
      // Cursor blinks twice, then start fade
      const blink1 = setTimeout(() => setShowCursor(false), 500);
      const blink2 = setTimeout(() => setShowCursor(true), 1000);
      const blink3 = setTimeout(() => setShowCursor(false), 1500);
      const fadeTimer = setTimeout(() => setStartFade(true), 2000);
      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 4000);

      return () => {
        clearTimeout(blink1);
        clearTimeout(blink2);
        clearTimeout(blink3);
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, text, fullText, onComplete]);

  return (
    <div className="fade-to-black-section" ref={sectionRef}>
      <div className="screenplay-content">
        <p className="scene-direction">
          {text}
          {text.length > 0 && text.length === fullText.length && showCursor && (
            <span className="cursor"></span>
          )}
        </p>
      </div>
      <div className={`black-overlay ${startFade ? 'active' : ''}`}></div>
    </div>
  );
};

export default FadeToBlack;
