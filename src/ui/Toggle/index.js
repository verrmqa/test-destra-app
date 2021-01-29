import './Toggle.style.css';
import './Toggle.tablet.css';
import './Toggle.mobile.css';

import React from 'react';

const Toggle = ({ onChange, defaultValue, id }) => {
  const settings = {
    role: 'switch',
    onClick: () => onChange(id, !defaultValue),
    className: `toggle toggle--${defaultValue ? 'active' : 'inactive'} gtm_control_element`
  };

  return (
    <div {...settings}>
      <input
        type='hidden'
        className='toggle__hidden'
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Toggle;
