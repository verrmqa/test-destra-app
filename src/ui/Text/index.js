import './Text.style.css';
import './Text.tablet.css';
import './Text.mobile.css';

import React from 'react';

const Text = ({ size, template = 'black', children }) => {
  const params = {
    className: `text text-${size} text--${template}`
  };

  return <span {...params}>{children}</span>;
};
export default Text;
