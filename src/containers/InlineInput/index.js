import './InlineInput.style.css';
import './InlineInput.widescreen.css';
import './InlineInput.tablet.css';
import './InlineInput.mobile.css';

import React, { useState, useRef, useEffect } from 'react';

import Title from '../../ui/Title';
import Button from '../../ui/Button';
import Render from '../Render';
import CallbackInput from '../CallbackInput';
import DocsInput from '../DocsInput';
import InputHoverLink from '../../ui/InputHoverLink/InputHoverLink';

const InlineInput = ({ r, placeholder, template = 'default', defaultValue, mask, onChange, error, _id, id, hint, label, filled, _type, service, matching, handleCallbackInput }) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(defaultValue || label || placeholder);
  const fieldRef = useRef();
  const windowRef = useRef();
  const containerRef = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 450;

  // InputHoverLink control here
  const [isShownHoverLink, setIsShownHoverLink] = useState(false);


  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleToggleInput = () => {
    setActive(!active);
    if (!active) {
      setTimeout(() => {
        if (fieldRef.current) fieldRef.current.select();
        if (windowRef.current && windowRef.current.getBoundingClientRect().left < 0) {
          windowRef.current.style.left = '0px';
        }
        if (windowRef.current) windowRef.current.style.opacity = '1';
      }, 100);
    }
  };

  const handleScroll = () => {
    const firstInput = document.querySelector('.inline-input--document') || document.querySelector('.inline-input--error');
    const card = document.querySelector('.document__frame__footer');
    if (firstInput !== null) {
      window.scrollTo({ top: firstInput.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
      firstInput.firstChild.click();
    } else card.scrollIntoView({ behavior: 'smooth' });
  };

  const renderField = () => {
    const showActions = true;
    // const fieldMeta = fields.find(_f => _f._id === _id);
    const params = {
      onBlur: (e) => {
        if (onChange) {
          let result = e.target.value;
          if (_type === 'price') {
            result = Number(e.target.value).toFixed(2).replace('.', ',');
          }
          setValue(result);
          onChange(id, e);
        }
        return handleToggleInput();
      },
      onKeyPress: (e) => {
        const key = e.which || e.keyCode;
        if (key === 13) {
          if (onChange) {
            let result = e.target.value;

            if (_type === 'price') {
              result = Number(e.target.value).toFixed(2).replace('.', ',');
            }

            setValue(result);

            setTimeout(() => onChange(id, { target: { value: result } }), 0);
          }

          setTimeout(() => {
            handleScroll();
          }, 100);

          return handleToggleInput();
        }
        setTimeout(() => {
          if (windowRef.current.getBoundingClientRect().right > window.outerWidth) {
            windowRef.current.style.right = '0px';
            windowRef.current.style.left = 'unset';
          }

          if (windowRef.current.getBoundingClientRect().left < 0) {
            windowRef.current.style.right = `${windowRef.current.getBoundingClientRect().left - 10}px`;
          }
        }, 100);
      },
      onChange: (e) => {
        setValue(e.target.value);
      },
      defaultValue: value !== label ? value : null,
      placeholder,
      size: 'big',
      r: (e) => {
        fieldRef.current = e;
      },
      visibleInnerButton: true
    };

    const handleNextButton = () => {
      setTimeout(() => {
        if (value !== label && value !== placeholder) onChange(id, { target: { value } });
        handleScroll();
      }, 100);
      return handleToggleInput();
    };

    const handleType = () => {
      switch (_type) {
        case 'date':
          return <DocsInput mask={mask} {...params} _type='date' type='text' />;
        case 'callback':
          return <CallbackInput {...params} service={service} matching={matching} handleCallbackInput={handleCallbackInput} />;
        default:
          if (_type.includes('date:')) return <DocsInput mask={mask} {...params} _type='date' type='text' />;
          return <DocsInput mask={mask} {...params} type='text' />;
      }
    };

    if (!isMobile) {
      return (
        <div
          ref={windowRef}
          className='inline-input__window'
          onMouseEnter={() => setIsShownHoverLink(false)}
        >
          {label && (
            <div className='inline-input__window__section inline-input__window__section-title'>
              <Title level={6}>{label}</Title>
            </div>
          )}
          <div className='inline-input__window__section inline-input__window__section-area'>
            {handleType()}
          </div>
          {showActions && (
            <div className='inline-input__window__section inline-input__window__section-actions'>
              <div className='inline-input__actions'>
                {/* <div className='inline-input__actions__section inline-input__actions__section-prev'>
                <Button size='small' template='gray' onClick={handlePrev}>Назад</Button>
              </div> */}
                <div className='inline-input__actions__section inline-input__actions__section-next'>
                  <Button onClick={handleNextButton}>Далее</Button>
                </div>
              </div>
            </div>
          )}
          {hint.length > 0 && (
            <div className='inline-input__window__section inline-input__window__section-hint'>
              <div className='inline-input__hint'>
                <Render element={{ value: hint }} />
              </div>
            </div>
          )}
          <div className='inline-input__window__section inline-input__window__section-progress'>
            <div className='inline-input__window__progress' />
          </div>
        </div>
      );
    }
  };

  let modifier = 'document';
  if (active) modifier = 'active';
  else {
    if (filled) modifier = 'filled';
    if (error) modifier = 'error';
  }

  // changing bottom inputHoverLink based on element's height
  const [inputBottom, setinputBottom] = useState(false);

  const hoverInput = (event) => {
    if (event.target.offsetHeight >= 28) setinputBottom(true);
    else setinputBottom(false);
    setIsShownHoverLink(true);
  };

  return (
    <span
      className={`inline-input inline-input--${modifier} `}
      id={_id}
      onMouseEnter={hoverInput}
      onMouseLeave={() => setIsShownHoverLink(false)}
    >
      <span
        ref={containerRef}
        onClick={handleToggleInput}
        className={`inline-input__value inline-input__value--${template}`}

      >
        {value || label}
      </span>
      {active && renderField()}
      <input type='hidden' value={value} ref={(e) => { r(id, e); }} />
      {isShownHoverLink ? (
        <div className={`inline-input__section  inline-input__section-hoverLink ${inputBottom ? 'inline-input__section-hoverLink--bottom' : ''}`}>
          <InputHoverLink onClick={handleToggleInput} />
        </div>
      ) : null}
    </span>
  );
};
export default InlineInput;
