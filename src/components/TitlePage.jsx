import { useState, useEffect } from 'react';
import './TitlePage.css';

const TitlePage = ({ onComplete }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showWrittenBy, setShowWrittenBy] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Sequence the title page animation
    const timer1 = setTimeout(() => setShowTitle(true), 500);
    const timer2 = setTimeout(() => setShowWrittenBy(true), 1500);
    const timer3 = setTimeout(() => setShowAuthor(true), 2500);

    // Cursor blinks twice
    const cursorBlink1 = setTimeout(() => setShowCursor(false), 3500);
    const cursorBlink2 = setTimeout(() => setShowCursor(true), 4000);
    const cursorBlink3 = setTimeout(() => setShowCursor(false), 4500);
    const cursorBlink4 = setTimeout(() => setShowCursor(true), 5000);

    // Start fade out and trigger completion
    const fadeTimer = setTimeout(() => setFadeOut(true), 5500);
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(cursorBlink1);
      clearTimeout(cursorBlink2);
      clearTimeout(cursorBlink3);
      clearTimeout(cursorBlink4);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`title-page ${fadeOut ? 'fade-out' : ''}`}>
      <div className="title-content">
        {showTitle && <h1 className="title">Portfolio</h1>}
        {showWrittenBy && <p className="written-by">written by</p>}
        {showAuthor && <h2 className="author">Jonah Eisenman</h2>}
        {showCursor && <span className="cursor"></span>}
      </div>
    </div>
  );
};

export default TitlePage;
