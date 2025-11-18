import { useCharacterAnimation } from '../hooks/useCharacterAnimation';
import './CharacterIntro.css';

const CharacterIntro = ({ onComplete, startDelay = 0 }) => {
  const { title, isTyping, isComplete } = useCharacterAnimation(startDelay);

  // Trigger onComplete when animation finishes
  if (isComplete && onComplete && !CharacterIntro.completed) {
    CharacterIntro.completed = true;
    setTimeout(onComplete, 1000);
  }

  // Show "Creative" when animation is complete, otherwise show current title
  const displayTitle = isComplete ? 'Creative' : title;

  return (
    <div className="character-intro">
      <div className="screenplay-content">
        <p className="character-description">
          <span className="character-name">JONAH EINISMAN</span> (20), a curly-haired{' '}
          <span className="character-title">
            {displayTitle}
            {!isComplete && <span className={`cursor ${isTyping ? 'typing' : ''}`}></span>}
          </span>
          {isComplete && ', shows you his portfolio.'}
        </p>
      </div>
    </div>
  );
};

// Reset flag for re-renders
CharacterIntro.completed = false;

export default CharacterIntro;
