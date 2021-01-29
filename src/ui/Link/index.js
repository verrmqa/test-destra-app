import './Link.style.css';
import './Link.tablet.css';
import './Link.mobile.css';

import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

// TODO: Refactor to switch(type). Remove if/else construction.

const Link = ({
  size = 14.4, template = 'blue', href, type = 'internal', children, onClick, disabled
}) => {
  const params = {
    className: `link link-${size || '14'} link--${template || 'default'} ${disabled ? 'link--disabled' : ''}`,
    onClick
  };

  switch (type) {
    case 'blank':
      return <a href={href} target='_blank' rel='noopener noreferrer' {...params}>{children}</a>;
    default:
    case 'internal':
      return <RouterLink to={href} {...params}>{children}</RouterLink>;
    case 'external':
      return <a href={href} rel='noopener noreferrer' {...params}>{children}</a>;
    case 'functional':
      return (
        <span {...params}>
          <a href={href} onClick={e => e.preventDefault()}>{children}</a>
        </span>
      );
  }
};
export default Link;
