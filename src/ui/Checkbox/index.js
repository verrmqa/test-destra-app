import './Checkbox.style.css';
import React from 'react';

const Checkbox = ({ checked = false, r, handleCheck, handleChange }) => {
  const params = {
    className: 'checkbox__hidden',
    type: 'checkbox',
    ref: (e) => {
      if (r instanceof Function) r(e);
    },
    checked,
    onChange: () => handleChange()
  };

  return (
    <div onClick={handleCheck} className={`checkbox checkbox--${checked ? 'checked' : 'unchecked'} gtm_control_element`}>
      <input {...params} />
    </div>
  );
};
export default Checkbox;
