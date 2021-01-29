import './Icon.style.css';
import React from 'react';

import Pack from './Pack';

const Icon = (props) => {
  const { name } = props;
  const Component = Pack[name];

  if (Component) return <Component {...props} />;

  return <i className={`icon icon--${name}`} />;
};
export default Icon;
