import { useState, useEffect, useMemo } from 'react';
import './SceneHeading.css';

const SceneHeading = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Get time of day or exact timestamp - calculate once on mount
  const fullText = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    const displaySecond = second.toString().padStart(2, '0');
    
    // Option 1: Use exact timestamp (more cinematic)
    return `INT. PORTFOLIO SITE – ${displayHour}:${displayMinute}:${displaySecond} ${ampm}`;
    
    // Option 2: Use time of day (uncomment to use instead)
    // if (hour < 12) return 'INT. PORTFOLIO SITE – MORNING';
    // if (hour < 17) return 'INT. PORTFOLIO SITE – DAY';
    // if (hour < 21) return 'INT. PORTFOLIO SITE – EVENING';
    // return 'INT. PORTFOLIO SITE – NIGHT';
  }, []);

  useEffect(() => {
    if (text.length < fullText.length) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 45);
      return () => clearTimeout(timer);
    } else if (!isComplete && text.length === fullText.length) {
      // Cursor blinks briefly
      const blink1 = setTimeout(() => setShowCursor(false), 300);
      const blink2 = setTimeout(() => setShowCursor(true), 600);

      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        if (onComplete) onComplete();
      }, 1200);

      return () => {
        clearTimeout(blink1);
        clearTimeout(blink2);
        clearTimeout(completeTimer);
      };
    }
  }, [text, fullText, isComplete, onComplete]);

  return (
    <div className="scene-heading">
      <div className="screenplay-content">
        <h2 className="scene-heading-text">
          {text}
          {!isComplete && showCursor && <span className="cursor"></span>}
        </h2>
      </div>
    </div>
  );
};

export default SceneHeading;
