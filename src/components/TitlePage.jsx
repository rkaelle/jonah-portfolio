import { useState, useEffect } from 'react';
import './TitlePage.css';

const TitlePage = ({ onComplete }) => {
  const [titleText, setTitleText] = useState('');
  const [writtenByText, setWrittenByText] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('title'); // title, writtenBy, author, complete

  const fullTitle = 'Portfolio';
  const fullWrittenBy = 'written by';
  const fullAuthor = 'Jonah Eisenman';

  useEffect(() => {
    if (currentPhase === 'title') {
      if (titleText.length < fullTitle.length) {
        const timer = setTimeout(() => {
          setTitleText(fullTitle.slice(0, titleText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentPhase('writtenBy');
        }, 800);
        return () => clearTimeout(timer);
      }
    } else if (currentPhase === 'writtenBy') {
      if (writtenByText.length < fullWrittenBy.length) {
        const timer = setTimeout(() => {
          setWrittenByText(fullWrittenBy.slice(0, writtenByText.length + 1));
        }, 80);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentPhase('author');
        }, 800);
        return () => clearTimeout(timer);
      }
    } else if (currentPhase === 'author') {
      if (authorText.length < fullAuthor.length) {
        const timer = setTimeout(() => {
          setAuthorText(fullAuthor.slice(0, authorText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentPhase('complete');
        }, 800);
        return () => clearTimeout(timer);
      }
    } else if (currentPhase === 'complete') {
      // Cursor blinks twice
      const cursorBlink1 = setTimeout(() => setShowCursor(false), 500);
      const cursorBlink2 = setTimeout(() => setShowCursor(true), 1000);
      const cursorBlink3 = setTimeout(() => setShowCursor(false), 1500);
      const cursorBlink4 = setTimeout(() => setShowCursor(true), 2000);

      // Start fade out and trigger completion
      const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 3500);

      return () => {
        clearTimeout(cursorBlink1);
        clearTimeout(cursorBlink2);
        clearTimeout(cursorBlink3);
        clearTimeout(cursorBlink4);
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [titleText, writtenByText, authorText, currentPhase, fullTitle, fullWrittenBy, fullAuthor, onComplete]);

  return (
    <div className={`title-page ${fadeOut ? 'fade-out' : ''}`}>
      <div className="title-content">
        <h1 className="title">
          {titleText}
          {currentPhase === 'title' && titleText.length < fullTitle.length && (
            <span className="cursor typing"></span>
          )}
        </h1>
        {currentPhase !== 'title' && (
          <p className="written-by">
            {writtenByText}
            {currentPhase === 'writtenBy' && writtenByText.length < fullWrittenBy.length && (
              <span className="cursor typing"></span>
            )}
          </p>
        )}
        {currentPhase === 'author' && (
          <h2 className="author">
            {authorText}
            {authorText.length < fullAuthor.length && (
              <span className="cursor typing"></span>
            )}
          </h2>
        )}
        {currentPhase === 'complete' && showCursor && <span className="cursor"></span>}
      </div>
    </div>
  );
};

export default TitlePage;
