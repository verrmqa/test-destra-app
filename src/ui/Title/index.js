import './Title.style.css';
import './Title.tablet.css';
import './Title.mobile.css';

import React from 'react';

const Title = ({ level, template, children, size, itemProp }) => {
  const params = { className: `title title--${template} title-${size}`, itemProp };

  switch (level) {
    case 6:
      return <h6 {...params}>{children}</h6>;
    case 5:
      return <h5 {...params}>{children}</h5>;
    case 4:
      return <h4 {...params}>{children}</h4>;
    case 3:
      return <h3 {...params}>{children}</h3>;
    case 2:
      return <h2 {...params}>{children}</h2>;
    case 1:
    default:
      return <h1 {...params}>{children}</h1>;
  }
};

export default Title;
