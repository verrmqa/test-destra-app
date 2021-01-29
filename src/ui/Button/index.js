import './Button.style.css';
import './Button.tablet.css';
import './Button.mobile.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon';

const Button = ({
  color = 'blue',
  size = 'default',
  type = 'functional',
  loading = false,
  children,
  onClick,
  href,
  disabled,
  icon,
  iconColor,
  className = ''
}) => {
  const renderIcon = () => {
    if (icon) {
      return (
        <span className='button__section button__section-icon'>
          <Icon color={iconColor} name={icon} />
        </span>
      );
    }
  };

  const renderContent = () => {
    if (children) {
      return (
        <span className='button__section button__section-text'>
          {children}
        </span>
      );
    }
  };

  const renderLoader = () => {
    if (loading) {
      return (
        <span className='button__section button__section-loader'>
          <span className='button__loader' />
        </span>
      );
    }
  };

  const params = { className: `button button-${size} button--${color} ${className}`, disabled };

  switch (type) {
    case 'internal':
      return (
        <Link to={href} {...params}>
          {renderIcon()}
          {renderContent()}
          {renderLoader()}
        </Link>
      );
    case 'external':
      return (
        <a href={href} {...params}>
          {renderIcon()}
          {renderContent()}
          {renderLoader()}
        </a>
      );
    case 'functional':
    default:
      return (
        <button type='button' onClick={onClick} {...params}>
          {renderIcon()}
          {renderContent()}
          {renderLoader()}
        </button>
      );
  }
};
export default Button;
