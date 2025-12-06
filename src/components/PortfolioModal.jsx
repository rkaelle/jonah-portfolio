import { useEffect, useState } from 'react';
import './PortfolioModal.css';

const PortfolioModal = ({ item, carouselImages, currentIndex, isOpen, onClose }) => {
  const [imageIndex, setImageIndex] = useState(currentIndex || 0);
  const images = carouselImages || (item ? [item] : []);

  useEffect(() => {
    if (isOpen && currentIndex !== undefined) {
      setImageIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Close on ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Navigate with arrow keys if in carousel mode
    const handleArrowKeys = (e) => {
      if (!isOpen || !carouselImages || carouselImages.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('keydown', handleArrowKeys);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, carouselImages, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[imageIndex];
  const isCarousel = carouselImages && carouselImages.length > 1;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="portfolio-modal-backdrop" onClick={handleBackdropClick}>
      <div className="portfolio-modal-content">
        <button 
          className="portfolio-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        
        {isCarousel && (
          <>
            <button 
              className="portfolio-modal-nav portfolio-modal-nav-prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="portfolio-modal-nav portfolio-modal-nav-next"
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
        
        {currentItem.image ? (
          <div className="portfolio-modal-image-container">
            <img 
              src={currentItem.image} 
              alt={currentItem.title}
              className="portfolio-modal-image"
            />
            <div className="portfolio-modal-footer">
              <p className="portfolio-modal-title">{currentItem.title}</p>
              {isCarousel && (
                <div className="portfolio-modal-counter">
                  {imageIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="portfolio-modal-coming-soon">
            <h3 className="portfolio-modal-title">{currentItem.title}</h3>
            <p className="coming-soon-text">Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioModal;

