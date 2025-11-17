import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter effect with support for typing, deleting, and pausing
 * @param {Array} sequences - Array of text sequences to type
 * @param {Object} options - Configuration options
 * @returns {Object} - Current text and state
 */
export const useTypewriter = (sequences = [], options = {}) => {
  const {
    typeSpeed = 50,
    deleteSpeed = 30,
    pauseDuration = 1000,
    loop = false,
    onComplete = null,
    startDelay = 0,
  } = options;

  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!sequences || sequences.length === 0) return;

    // Handle start delay
    if (!started) {
      const startTimer = setTimeout(() => {
        setStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimer);
    }

    if (isComplete && !loop) return;

    const currentSequence = sequences[sequenceIndex];

    if (typeof currentSequence === 'string') {
      // Simple string typing
      if (!isDeleting && currentText !== currentSequence) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setCurrentText(currentSequence.slice(0, currentText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else if (currentText === currentSequence && !isDeleting) {
        setIsTyping(false);

        // Check if this is the last sequence
        if (sequenceIndex === sequences.length - 1 && !loop) {
          setIsComplete(true);
          if (onComplete) onComplete();
          return;
        }

        // Move to next sequence
        const timer = setTimeout(() => {
          setSequenceIndex((prev) => (prev + 1) % sequences.length);
          setCurrentText('');
        }, pauseDuration);
        return () => clearTimeout(timer);
      }
    } else if (typeof currentSequence === 'object') {
      // Object with type, delete, or pause action
      const { action, text, speed, pause, repeat = 1 } = currentSequence;

      if (action === 'type') {
        if (currentText.length < text.length) {
          setIsTyping(true);
          const timer = setTimeout(() => {
            setCurrentText(text.slice(0, currentText.length + 1));
          }, speed || typeSpeed);
          return () => clearTimeout(timer);
        } else {
          setIsTyping(false);
          const timer = setTimeout(() => {
            setSequenceIndex((prev) => prev + 1);
          }, pause || pauseDuration);
          return () => clearTimeout(timer);
        }
      } else if (action === 'delete') {
        if (currentText.length > 0) {
          setIsDeleting(true);
          setIsTyping(true);
          const timer = setTimeout(() => {
            setCurrentText((prev) => prev.slice(0, -1));
          }, speed || deleteSpeed);
          return () => clearTimeout(timer);
        } else {
          setIsDeleting(false);
          setIsTyping(false);
          const timer = setTimeout(() => {
            setSequenceIndex((prev) => prev + 1);
          }, pause || 100);
          return () => clearTimeout(timer);
        }
      } else if (action === 'pause') {
        setIsTyping(false);
        const timer = setTimeout(() => {
          setSequenceIndex((prev) => prev + 1);
        }, pause || pauseDuration);
        return () => clearTimeout(timer);
      } else if (action === 'complete') {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }
  }, [currentText, sequenceIndex, isDeleting, sequences, typeSpeed, deleteSpeed, pauseDuration, loop, isComplete, onComplete, started, startDelay]);

  return {
    text: currentText,
    isTyping,
    isDeleting,
    isComplete,
  };
};
