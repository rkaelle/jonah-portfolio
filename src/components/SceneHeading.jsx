import { useState, useEffect } from 'react';
import './SceneHeading.css';

const SceneHeading = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Get time of day or exact timestamp
  const getTimeOfDay = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    const displaySecond = second.toString().padStart(2, '0');
    
    // Option 1: Use exact timestamp (more cinematic)
    return `${displayHour}:${displayMinute}:${displaySecond} ${ampm}`;
    
    // Option 2: Use time of day (uncomment to use instead)
    // if (hour < 12) return 'MORNING';
    // if (hour < 17) return 'DAY';
    // if (hour < 21) return 'EVENING';
    // return 'NIGHT';
  };

  const fullText = `INT. PORTFOLIO SITE – ${getTimeOfDay()}`;

  useEffect(() => {
    if (text.length < fullText.length) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 60);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      // Cursor blinks twice
      const blink1 = setTimeout(() => setShowCursor(false), 500);
      const blink2 = setTimeout(() => setShowCursor(true), 1000);
      const blink3 = setTimeout(() => setShowCursor(false), 1500);
      const blink4 = setTimeout(() => setShowCursor(true), 2000);

      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        if (onComplete) onComplete();
      }, 2500);

      return () => {
        clearTimeout(blink1);
        clearTimeout(blink2);
        clearTimeout(blink3);
        clearTimeout(blink4);
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
