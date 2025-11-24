import { useState, useEffect, useRef } from 'react';
import PortfolioModal from './PortfolioModal';
import './PortfolioSection.css';

const PortfolioSection = ({
  title,
  subtitle,
  categories = [],
  items = [],
  delay = 0
}) => {
  const [titleText, setTitleText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Type the title when visible
  useEffect(() => {
    if (!isVisible) return;

    const startTimer = setTimeout(() => {
      if (titleText.length < title.length) {
        const timer = setTimeout(() => {
          setTitleText(title.slice(0, titleText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const subtitleTimer = setTimeout(() => setShowSubtitle(true), 300);
        const categoriesTimer = setTimeout(() => setShowCategories(true), 800);
        const itemsTimer = setTimeout(() => setShowItems(true), 1200);

        return () => {
          clearTimeout(subtitleTimer);
          clearTimeout(categoriesTimer);
          clearTimeout(itemsTimer);
        };
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [isVisible, titleText, title, delay]);

  const isWritingSection = title === 'WRITING';

  return (
    <div className={`portfolio-section ${isWritingSection ? 'writing-section' : ''}`} ref={sectionRef}>
      <div className="screenplay-content">
        <h3 className="section-title">
          {titleText}
          {titleText.length < title.length && <span className="cursor typing"></span>}
        </h3>

        {showSubtitle && subtitle && (
          <p className="section-subtitle handwritten-note">{subtitle}</p>
        )}

        {showCategories && categories.length > 0 && (
          <div className="section-categories">
            {categories.map((category, index) => (
              <span key={index} className="category-tag handwritten-bullet">
                {category}
              </span>
            ))}
          </div>
        )}

        {showItems && items.length > 0 && (
          <>
            <div className="portfolio-grid">
              {items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={`portfolio-item ${item.video ? 'video-item' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    // Only open modal for images or placeholder items (not videos)
                    if (!item.video) {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <div className="item-thumbnail">
                    {item.video ? (
                      <video 
                        key={item.video}
                        src={item.video} 
                        controls
                        preload="metadata"
                        className="portfolio-video"
                        onClick={(e) => e.stopPropagation()}
                        playsInline
                        muted={false}
                      >
                        <source src={item.video} type="video/quicktime" />
                        Your browser does not support the video tag.
                      </video>
                    ) : item.image ? (
                      <img src={item.image} alt={item.title} />
                    ) : (
                      <div className="placeholder-thumbnail">
                        <span>{item.title}</span>
                      </div>
                    )}
                  </div>
                  <p className="item-title">{item.title}</p>
                </div>
              ))}
            </div>
            <PortfolioModal
              item={selectedItem}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedItem(null);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;
