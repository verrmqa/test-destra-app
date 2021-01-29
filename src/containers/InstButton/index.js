import './InstButton.style.css';
import './InstButton.widescreen.css';
import './InstButton.tablet.css';
import './InstButton.mobile.css';

import React from 'react';

import Button from '../../ui/Button';

const InstButton = ({ value, title }) => (
  <div className='instButton'>
    <Button type='external' icon='togglelink' href={value} size='small' color='allwhite-blue'>{title}</Button>
  </div>
);

export default InstButton;
