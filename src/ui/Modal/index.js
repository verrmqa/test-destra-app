import './Modal.style.css';
import './Modal.tablet.css';
import './Modal.mobile.css';

import React, { useEffect, useRef } from 'react';

import Title from '../Title';
import Text from '../Text';

// TODO: Consider to move component to @containers.

const Modal = ({
  title = null,
  titleSize = 5,
  description,
  children,
  onClose,
  isOpen = false,
  template = 'default',
  closeButton = true
}) => {
  const modal = useRef();

  const handleClose = () => {
    document.querySelector('body').style.overflow = 'auto';
    document.querySelector('.layout__section-header').classList.remove('layout__section-header--modal');
    return onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').style.overflow = 'hidden';
      if (document.querySelector('.layout__section-header')) {
        document.querySelector('.layout__section-header').classList.add('layout__section-header--modal');
        modal.current.focus();
      }
    }
    return () => { document.querySelector('body').style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <div className={`modal__wrapper modal__wrapper--${isOpen ? 'active' : 'inactive'}`}>
      <div className='modal'>
        {onClose && (<div role='button' tabIndex={-2} className='modal__section modal__section-overlay' onClick={handleClose} />)}
        <div className={`modal__section modal__section-body modal__section--${template}`} tabIndex={0} role='button' ref={modal}>
          <div className={`modal__body modal__body-${template || 'default'}`}>
            {closeButton && (
              <div className='modal__body__section modal__body__section-close'>
                <div role='button' tabIndex={-1} className='modal__close' onClick={handleClose}>
                  <svg className='modal__close__src' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'>
                    <g className='icon__zone' fill='none' fillRule='nonzero' stroke='#5E9CDF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'>
                      <path d='M10.924 10.588L1.5 1.164M10.924 1.412L1.5 10.836' />
                    </g>
                  </svg>
                </div>
              </div>
            )}
            {title && (
              <div className='modal__body__section modal__body__section-title'>
                <Title level={titleSize || 3} template='black'>{title}</Title>
              </div>
            )}
            {description && (
              <div className='modal__body__section modal__body__section-description'>
                <Text size={14} template='black'>{description}</Text>
              </div>
            )}
            <div className='modal__body__section modal__body__section-content'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
