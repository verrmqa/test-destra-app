import './Arrow.style.css';
import './Arrow.mobile.css';
import React from 'react';

import Icon from '../Icon';

const Arrow = ({ direction, template, onClick }) => (
  <button type='button' onClick={onClick} className={`arrow arrow-${direction || 'prev'} arrow--${template || 'default'}`}>
    <span className='arrow__icon'>
      <Icon name='arrow' />
    </span>
  </button>
  );
export default Arrow;
