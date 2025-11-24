import { useState, useEffect } from 'react';
import './ContactSection.css';

const ContactSection = ({ startDelay = 0 }) => {
  const [showContent, setShowContent] = useState(startDelay === 0);
  const [text, setText] = useState('');
  const fullText = 'CONTACT ME';

  useEffect(() => {
    if (startDelay === 0) {
      setShowContent(true);
      return;
    }
    
    const delayTimer = setTimeout(() => {
      setShowContent(true);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!showContent) return;

    if (text.length < fullText.length) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [showContent, text, fullText]);

  return (
    <div className="contact-section">
      <div className="contact-content">
        <h2 className="contact-title">
          {text}
          {text.length > 0 && text.length < fullText.length && (
            <span className="cursor typing"></span>
          )}
        </h2>

        {text.length === fullText.length && (
          <div className="contact-details">
            <a
              href="http://www.linkedin.com/in/jonah-einisman"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link contact-button"
            >
              LinkedIn
            </a>
            <div className="contact-info">
              <a
                href="mailto:jonaheinisman@gmail.com"
                className="contact-email"
              >
                jonaheinisman@gmail.com
              </a>
              <a
                href="tel:612-200-7824"
                className="contact-phone"
              >
                612-200-7824
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
