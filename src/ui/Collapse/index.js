import './Collapse.style.css';
import './Collapse.tablet.css';
import './Collapse.mobile.css';

import React from 'react';

const Collapse = ({ title, children, template }) => (
  <div className={`collapse collapse--${template || 'default'}`}>
    <div
      className='collapse__title'
      onClick={e => e.target.parentNode.classList.toggle('collapse--open')}
    >
      {title}
    </div>
    {Array.isArray(children)
        ? children.map(child => <div className='collapse__content'>{child}</div>)
        : <div className='collapse__content'>{children}</div>
      }
  </div>
  );

export default Collapse;
