import './Drop.style.css';
import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon';

const Drop = ({
  template = 'default',
  icon = 'arrow',
  href,
  onClick = () => {},
  type = 'functional',
  active
}) => {
  const element = (
    <span className='drop__circle'>
      <span className='drop__icon'>
        <Icon name={icon} />
      </span>
    </span>
  );
  const params = {
    className: `drop drop-${active ? 'active' : 'inactive'} drop--${template}`
  };

  switch (type) {
    case 'internal':
      return <Link to={href} {...params}>{element}</Link>;
    case 'external':
      return <a href={href} {...params}>{element}</a>;
    case 'functional':
    default:
      return <span onClick={onClick} {...params}>{element}</span>;
  }
};
export default Drop;
