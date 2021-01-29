import './Tag.style.css';
import './Tag.mobile.css';
import React from 'react';

const Tag = ({ children, template }) => (
  <span className={`tag tag--${template}`}>{children}</span>
);
export default Tag;
