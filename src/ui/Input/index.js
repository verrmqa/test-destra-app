import './Input.style.css';
import './Input.tablet.css';
import './Input.mobile.css';


import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import Icon from '../Icon';
import isWindowDefined from '../../helpers/isWindowDefined';

const Input = ({
  placeholder,
  floatingPlaceholder,
  icon = null,
  iconColor,
  r,
  template = 'grey-border',
  size = 'medium',
  error = null,
  defaultValue,
  mask,
  onChange,
  onKeyPress,
  onClick,
  onBlur,
  type,
  // Props for button in input
  visibleInnerButton = false,
}) => {
  const [inputValue, handleInputValue] = useState('');
  const [visibleButton, setVisibleButton] = useState(false);
  const fieldRef = useRef();
  const inputRef = useRef();

  const isMobile = isWindowDefined() && window.innerWidth <= 450;

  let status = 'blank';
  if (inputValue) status = 'filled';
  if (error) status = 'error';

  useEffect(() => {
    handleInputValue(defaultValue);

    if (isMobile) setVisibleButton(false);
    else setVisibleButton(visibleInnerButton);
  }, [defaultValue, visibleInnerButton]);

  const handleChange = (e) => {
    if (onChange) onChange(e);
    handleInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (onKeyPress) onKeyPress(e);
  };

  const handleClick = (e) => {
    if (onClick) return onClick(e);
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
    setTimeout(() => {
      if (isMobile && visibleInnerButton) setVisibleButton(false);
    }, 0);

    e.target.classList.remove('input__field-focused');
  };

  const handleFocus = (e) => {
    if (isMobile && visibleInnerButton) {
      document.querySelector('.document__side__section-progressbar').classList.toggle('document__side__section-progressbar--hidden');
      setVisibleButton(true);
    }
    e.target.classList.add('input__field-focused');
  };

  const handlePlaceholder = () => {
    if (floatingPlaceholder) return null;
    if (visibleInnerButton && placeholder.length > 43) return `${placeholder.slice(0, 41)}...`;
    return placeholder;
  };

  const params = {
    className: 'input__field',
    inputRef: (e) => {
      fieldRef.current = e;

      if (r instanceof Function) return r(e);
    },
    onBlur: handleBlur,
    onKeyPress: handleKeyPress,
    onChange: handleChange,
    onClick: handleClick,
    onFocus: handleFocus,
    value: inputValue || '',
    type: type || 'text',
    alwaysShowMask: false,
    placeholder: handlePlaceholder(),
    mask: mask || null
  };

  const handleChatButton = () => window.Chatra('openChat', true);

  return (
    <div className={`input input-${size} input--${template} input-${status}`} ref={inputRef}>
      <div className='input__section input__section-field'>
        <InputMask {...params} />
        {placeholder && floatingPlaceholder ? <span className='input__placeholder'>{placeholder}</span> : null}
      </div>
      {icon && !visibleButton ? (
        <div className='input__section input__section-icon'>
          <Icon color={iconColor} name={icon} />
        </div>
      ) : null}
      {error && typeof error !== 'boolean' ? (
        <div className='input__section input__section-error'>
          <div className='input__error'>{error}</div>
        </div>
      ) : null}
      {visibleButton && (!inputValue || inputValue.includes('_')) ? (
        <div className='input__section input__section-button'>
          <span onClick={handleChatButton} className='input__button'>Что здесь писать?</span>
        </div>
      ) : null}
    </div>
  );
};
export default Input;
