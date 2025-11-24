import { useState } from 'react';
import TitlePage from './components/TitlePage';
import SceneHeading from './components/SceneHeading';
import CharacterIntro from './components/CharacterIntro';
import PortfolioSection from './components/PortfolioSection';
import FadeToBlack from './components/FadeToBlack';
import ContactSection from './components/ContactSection';
import { portfolioData } from './data/portfolioData';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleTitleComplete = () => {
    // Scroll to top smoothly after title page fades
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(1);
    }, 500);
  };

  const handleSceneHeadingComplete = () => {
    setCurrentStep(2);
  };

  const handleCharacterIntroComplete = () => {
    setCurrentStep(3);
  };

  const handleFadeComplete = () => {
    setCurrentStep(4);
  };

  return (
    <div className="screenplay-page">
      {/* Title Page */}
      {currentStep === 0 && (
        <TitlePage onComplete={handleTitleComplete} />
      )}

      {/* Main Content - Shows after title page */}
      {currentStep >= 1 && (
        <>
          {/* Scene Heading */}
          <SceneHeading onComplete={handleSceneHeadingComplete} />

          {/* Character Introduction */}
          {currentStep >= 2 && (
            <CharacterIntro
              onComplete={handleCharacterIntroComplete}
              startDelay={500}
            />
          )}

          {/* Portfolio Sections - Show after character intro */}
          {currentStep >= 3 && (
            <>
              <PortfolioSection
                title={portfolioData.videos.title}
                categories={portfolioData.videos.categories}
                items={portfolioData.videos.items}
              />

              <PortfolioSection
                title={portfolioData.design.title}
                subtitle={portfolioData.design.subtitle}
                categories={portfolioData.design.categories}
                items={portfolioData.design.items}
              />

              <PortfolioSection
                title={portfolioData.artwork.title}
                categories={portfolioData.artwork.categories}
                items={portfolioData.artwork.items}
              />

              <PortfolioSection
                title={portfolioData.writing.title}
                subtitle={portfolioData.writing.subtitle}
                items={portfolioData.writing.items}
              />

              {/* Fade to Black */}
              <FadeToBlack onComplete={handleFadeComplete} />
            </>
          )}

          {/* Contact Section - Only show after fade completes */}
          {currentStep >= 4 && (
            <ContactSection startDelay={0} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
