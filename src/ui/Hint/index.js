import './Hint.style.css';
import './Hint.tablet.css';
import './Hint.mobile.css';

import React, { useEffect, useContext, useRef } from 'react';
import { ResolutionContext } from '../../bootstrap/contexts/ResolutionContext';


const Hint = ({ children, template = 'default', title }) => {
  const isMobile = useContext(ResolutionContext);
  const contentRef = useRef();

  useEffect(() => {
    if (isMobile) {
      contentRef.current.classList.add('hint--mobile');
    }
  });

  const handleHover = () => {
    contentRef.current.classList.remove('hint__section-content--top');

    const rect = contentRef.current.getBoundingClientRect();

    if (rect.right > window.outerWidth) {
      contentRef.current.style.position = 'absolute';
      contentRef.current.style.left = `${window.outerWidth - rect.right - 30}px`;
    } else if (rect.bottom >= window.innerHeight) {
      contentRef.current.classList.add('hint__section-content--top');
    }
  };

  return (
    <span className={`hint hint--${template}`} onMouseEnter={handleHover}>
      <span className='hint__section hint__section-icon'>
        <span className={`hint__icon hint__icon--${template}`} />
      </span>
      {title && (
        <span className='hint__section hint__section-title'>
          <span className='hint__title'>
            {title}
          </span>
        </span>
      )}
      <span className='hint__section hint__section-content' ref={contentRef}>
        <div className='hint__content'>
          {children}
        </div>
      </span>
    </span>
  );
};
export default Hint;
