import { useState, useEffect } from 'react';

/**
 * Hook for the character introduction animation
 * Cycles through different job titles with typing/deleting effect
 */
export const useCharacterAnimation = (startDelay = 0) => {
  const titles = [
    'Student',
    'Painter',
    'Dancer',
    'Musician',
    'Artist?',
    '', // Deleted
    'Screenwriter',
    'Animator',
    'Graphic Designer',
    'VFX Artist',
    'Video Editor',
    'Rapper??',
    '', // Deleted with "maybe not that one"
    'Creative'
  ];

  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      const startTimer = setTimeout(() => {
        setStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimer);
    }

    if (isComplete) return;

    const targetTitle = titles[titleIndex];

    // Handle empty string (deleted state)
    if (targetTitle === '') {
      // If we're at an empty string, just move to next immediately
      const timer = setTimeout(() => {
        setTitleIndex((prev) => prev + 1);
        setIsTyping(true);
      }, 300);
      return () => clearTimeout(timer);
    }

    if (isTyping) {
      // Type the current title
      if (currentTitle.length < targetTitle.length) {
        const timer = setTimeout(() => {
          setCurrentTitle(targetTitle.slice(0, currentTitle.length + 1));
        }, 60);
        return () => clearTimeout(timer);
      } else {
        // Finished typing
        setIsTyping(false);

        // If this is the last title, we're done
        if (titleIndex === titles.length - 1) {
          const timer = setTimeout(() => {
            setIsComplete(true);
          }, 800);
          return () => clearTimeout(timer);
        }

        // Special pause for "Rapper??" to show hesitation, then delete
        const pauseTime = targetTitle === 'Rapper??' ? 1500 : 
                          targetTitle === 'Artist?' ? 1000 : 600;

        // Pause, then start deleting
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
        return () => clearTimeout(timer);
      }
    } else {
      // Delete the current title
      if (currentTitle.length > 0) {
        const timer = setTimeout(() => {
          setCurrentTitle((prev) => prev.slice(0, -1));
        }, 40);
        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next title
        const timer = setTimeout(() => {
          setTitleIndex((prev) => prev + 1);
          setIsTyping(true);
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, [currentTitle, titleIndex, isTyping, isComplete, started, startDelay, titles]);

  return {
    title: currentTitle,
    isTyping,
    isComplete,
  };
};
