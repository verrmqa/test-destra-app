import './Container.style.css';
import './Container.tablet.css';
import './Container.mobile.css';

import React from 'react';

const Container = ({ children, template }) => (
  <div className={`container container--${template || 'default'}`}>
    {children}
  </div>
  );
  export default Container;
