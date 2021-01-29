import './Phone.style.css';
import React from 'react';

import Icon from '../Icon';

const Phone = ({ children = 79256403633, icon, template }) => (
  <a className={`phone phone--${template || 'default'}`} href={`tel:${children}`}>
    {icon && (
      <div className='phone__section phone__section-icon'>
        <div className='phone__icon'>
          <Icon name={icon} />
        </div>
      </div>
    )}
    <div className='phone__section phone__section-number'>
      {children.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}
    </div>
  </a>
  );
export default Phone;
