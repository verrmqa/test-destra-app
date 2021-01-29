import './Note.style.css';
import './Note.tablet.css';
import './Note.mobile.css';

import React from 'react';

const Note = ({ children }) => (
  <div className='note'>
    {children}
  </div>
);
export default Note;
