import { useState, useEffect } from 'react';
import './ContactSection.css';

const ContactSection = ({ startDelay = 0 }) => {
  const [showContent, setShowContent] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'CONTACT ME';

  useEffect(() => {
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
              href="https://www.linkedin.com/in/jonah-eisenman"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              LinkedIn →
            </a>
            <a
              href="mailto:jonah.eisenman@gmail.com"
              className="contact-link"
            >
              jonah.eisenman@gmail.com
            </a>
            <a
              href="tel:612-200-7624"
              className="contact-link"
            >
              612-200-7624
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
