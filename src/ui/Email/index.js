import './Email.style.css';
import React from 'react';

const Email = ({ children }) => (
  <a itemProp='email' className='email' href={`mailto:${children}`}>
    {children}
  </a>
);
export default Email;
