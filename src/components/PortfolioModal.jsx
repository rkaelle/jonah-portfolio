import { useEffect } from 'react';
import './PortfolioModal.css';

const PortfolioModal = ({ item, isOpen, onClose }) => {
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

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
        
        {item.image ? (
          <div className="portfolio-modal-image-container">
            <img 
              src={item.image} 
              alt={item.title}
              className="portfolio-modal-image"
            />
            <p className="portfolio-modal-title">{item.title}</p>
          </div>
        ) : (
          <div className="portfolio-modal-coming-soon">
            <h3 className="portfolio-modal-title">{item.title}</h3>
            <p className="coming-soon-text">Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioModal;

