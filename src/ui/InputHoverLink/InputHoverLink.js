import './style.css';
import './tablet.css';
import './mobile.css';

import React from 'react';

const InputHoverLink = ({ onClick }) => {
  const handleChatLink = () => window.Chatra('openChat', true);
  return (
    <div className='inputHoverLink'>
      <div className='inputHoverLink__section  inputHoverLink__section-title'>
        <p className='inputHoverLink__title' onClick={onClick}>Нажмите, чтобы заполнить</p>
      </div>
      <div className='inputHoverLink__section  inputHoverLink__section-link'>
        <span onClick={handleChatLink} className='inputHoverLink__link'>Не знаю, что писать в этом поле</span>
      </div>
    </div>
  );
};

export default InputHoverLink;
