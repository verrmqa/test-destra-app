import './Stage.style.css';
import './Stage.tablet.css';
import './Stage.mobile.css';

import React, { useState, useEffect } from 'react';

import Title from '../../ui/Title';
import Button from '../../ui/Button';

const Stage = ({ title, counter, children, template, button, handleNext, isButtonShown }) => {
  const [isShown, handleShown] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 450) {
      document.querySelector('.stage').classList.add('stage--open');
    }
  }, []);

  const handleStage = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 450) {
      document.querySelectorAll('.stage')[counter - 1].classList.toggle('stage--open');
      window.location.hash = 'stage_';
      window.location.hash = `stage_${counter}`;
    }
  };

  const handleStageButton = () => {
    handleShown(false);
    handleNext();
  };

  return (
    <div className={`stage stage--${template || 'default'}`} id={`stage_${counter}`} itemProp='step' itemScope='' itemType='http://schema.org/HowToStep'>
      {title && (
        <div className='stage__section stage__section-header' onClick={() => handleStage()}>
          <div className='stage__header'>
            <div className='stage__header__section stage__header__section-counter'>
              <div className='stage__counter'>
                <div className='stage__counter__circle'>{counter}</div>
              </div>
            </div>
            <div className='stage__header__section stage__header__section-title'>
              <Title itemProp='name' level={4} template='black'>{title}</Title>
            </div>
          </div>
        </div>
      )}
      <div className='stage__section stage__section-content'>
        <div className='stage__content'>
          {children}
        </div>
      </div>
      {button && isShown && isButtonShown && (
        <div className='stage__section stage__section-button'>
          <div className='stage__button__text'>{button}</div>
          <div className='stage__button'>
            <Button size='medium' color='transparent-blue' onClick={handleStageButton}>Далее</Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Stage;
