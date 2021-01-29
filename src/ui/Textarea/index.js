import './Textarea.style.css';
import React from 'react';

// TODO: Too heavy logic.

const Textarea = ({
  template = 'default',
  size = 'default',
  value,
  placeholder,
  label,
  r,
  onChange
}) => {
  const handleFocus = () => {
    r.current.classList.add('textarea__field-focus');
  };

  const handleBlur = () => {
    r.current.classList.remove('textarea__field-blur');
  };

  const params = {
    className: `textarea__field textarea__field-${size} textarea__field--${template}`,
    placeholder,
    ref: r,
    onFocus: handleFocus,
    onBlur: handleBlur,
    defaultValue: value,
    onChange
  };

  return (
    <div className={`textarea textarea--${template}`}>
      {label && (
        <div className='textarea__section textarea__section-label'>
          <div className={`textarea__label textarea__label--${template}`}>
            {label}
          </div>
        </div>
      )}
      <div className='textarea__section textarea__section-field'>
        <textarea {...params} />
      </div>
    </div>
  );
};

export default Textarea;
