import './Radio.style.css';
import './Radio.tablet.css';
import './Radio.mobile.css';

import React, { useState } from 'react';

import Render from '../../containers/Render';
import Hint from '../Hint';

const Radio = ({ value, defaultValue, id, onChange, type }) => {
  const _defaultSelected = value.find(item => item.id === Number(defaultValue));
  const [selected, setSelected] = useState(_defaultSelected || null);

  const handleSelect = (option) => {
    onChange(id, option.id, type);
    setSelected(option);
  };

  return (
    <div className='radio'>
      {value.map((option) => {
        const isSelected = selected.id === option.id;

        return (
          <div key={`${id}_${option.id}`} className={`radio__section radio__section--${isSelected ? 'active' : 'inactive'}`}>
            <div role='button' tabIndex={-1} className='radio__field gtm_control_element' onClick={() => handleSelect(option)}>
              <div className='radio__field__section radio__field__section-button'>
                <div className={`radio__button radio__button--${isSelected ? 'active' : 'inactive'}`} />
              </div>
              <div className='radio__field__section radio__field__section-label'>
                <div className={`radio__label radio__label--${isSelected ? 'active' : 'inactive'}`}>{option.value}</div>
                {!!option.hint && (
                <div className='radio__field__hint'>
                  <Hint template='control'>
                    <Render element={{ value: option.hint }} />
                  </Hint>
                </div>
              )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Radio;
