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
  const fullAuthor = 'Jonah Einisman';

  useEffect(() => {
    if (currentPhase === 'title') {
      if (titleText.length < fullTitle.length) {
        const timer = setTimeout(() => {
          setTitleText(fullTitle.slice(0, titleText.length + 1));
        }, 60);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentPhase('writtenBy');
        }, 400);
        return () => clearTimeout(timer);
      }
    } else if (currentPhase === 'writtenBy') {
      if (writtenByText.length < fullWrittenBy.length) {
        const timer = setTimeout(() => {
          setWrittenByText(fullWrittenBy.slice(0, writtenByText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentPhase('author');
        }, 400);
        return () => clearTimeout(timer);
      }
    } else if (currentPhase === 'author') {
      if (authorText.length < fullAuthor.length) {
        const timer = setTimeout(() => {
          setAuthorText(fullAuthor.slice(0, authorText.length + 1));
        }, 60);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentPhase('complete');
        }, 400);
        return () => clearTimeout(timer);
      }
    } else if (currentPhase === 'complete') {
      // Brief cursor blink, then fade out quickly
      const cursorBlink1 = setTimeout(() => setShowCursor(false), 300);
      const cursorBlink2 = setTimeout(() => setShowCursor(true), 600);

      // Start fade out and trigger completion sooner
      const fadeTimer = setTimeout(() => setFadeOut(true), 900);
      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1400);

      return () => {
        clearTimeout(cursorBlink1);
        clearTimeout(cursorBlink2);
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
        {(currentPhase === 'author' || currentPhase === 'complete') && (
          <h2 className="author">
            {authorText}
            {currentPhase === 'author' && authorText.length < fullAuthor.length && (
              <span className="cursor typing"></span>
            )}
            {currentPhase === 'complete' && showCursor && <span className="cursor"></span>}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TitlePage;
