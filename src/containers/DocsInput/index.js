import './DocsInput.style.css';
import './DocsInput.mobile.css';
import React, { useState, useRef, useEffect } from 'react';
import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';

import 'moment/locale/ru';
import moment from 'moment';

import Render from '../Render';
import Input from '../../ui/Input';

const DocsInput = ({ onChange, r, onBlur, onKeyPress, placeholder, hint, mask, _type, defaultValue, promoview, error, size, visibleInnerButton
}) => {
  const input = useRef();
  const field = useRef();
  const [isPickerActive, handlePicker] = useState(true);
  const mobile = typeof window !== 'undefined' && window.outerWidth <= 450;

  const handleBlur = () => {
    if (mobile || promoview) {
      setTimeout(() => {
        handlePicker(false);
      }, 0);
    }

    if (onBlur) onBlur({ target: field.current });
  };

  useEffect(() => {
    if (mobile || promoview) handlePicker(false);
    else {
      document.addEventListener('click', (e) => { if (input.current && !input.current.contains(e.target)) handleBlur(); });
      return document.removeEventListener('click', (e) => { if (input.current && !input.current.contains(e.target)) handleBlur(); });
    }
  }, []);

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const handleKeyPress = (e) => {
    if (onKeyPress) onKeyPress(e);
  };

  const handleClick = () => {
    if (mobile || promoview) handlePicker(true);
  };

  const handleCalendar = (e) => {
    field.current.value = moment(e).format('DD.MM.YYYY');
    handleBlur();
  };

  return (
    <div className='docs-input' ref={input}>
      <div className='docs-input__section docs-input__section-field'>
        <Input
          defaultValue={defaultValue}
          onClick={handleClick}
          error={error}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={(mobile || promoview) ? handleBlur : null}
          placeholder={placeholder}
          size={size}
          r={(e) => {
            field.current = e;

            if (r instanceof Function) return r(e);
          }}
          mask={mask ? mask.mask : null}
          visibleInnerButton={visibleInnerButton}
        />
      </div>
      {_type === 'date' && isPickerActive && (
        <div className='docs-input__section docs-input__section-calendar'>
          <DayPicker
            onDayClick={e => handleCalendar(e)}
            selectedDays={defaultValue && new Date(`${defaultValue.split('.')[1]}-${defaultValue.split('.')[0]}-${defaultValue.split('.')[2]}`)}
            locale='ru'
            localeUtils={MomentLocaleUtils}
          />
        </div>
      )}
      {hint && hint.length > 0 && (
        <div className='docs-input__section docs-input__section-hint'>
          <div className='docs-input__hint'>
            <Render element={{ value: hint }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocsInput;
