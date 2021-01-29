import './Multiselect.style.css';
import './Multiselect.tablet.css';
import './Multiselect.mobile.css';

import React, { useEffect, useState } from 'react';

import Render from '../../containers/Render';
import Hint from '../Hint';

// TODO: Why there is an array of OPTIONS inside VALUE ?

const Multiselect = ({ value, defaultValue, id, onChange, type }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  const handleSelect = (option) => {
    onChange(id, option.id, type);
    if (!defaultValue) {
      setSelected([...selected, option.id]);

      if (selected.includes(option.id)) {
        const array = [...selected];
        const index = array.findIndex(item => option.id === item);

        if (index !== -1) {
          array.splice(index, 1);
          setSelected(array);
        }
      }
    }
  };

  return (
    <div className='multiselect'>
      {value.map((option) => {
        const params = {
          type: 'checkbox',
          name: option.id,
          defaultChecked: selected.includes(option.id) || (option.isActive === false ? !option.isActive : null)
        };

        return (
          <div key={`${id}_${option.id}`} className='multiselect__section'>
            <div role='checkbox' tabIndex={-1} onClick={() => handleSelect(option)} className='multiselect__field gtm_control_element'>
              <div className='multiselect__field__section multiselect__field__section-input'>
                <div className={`multiselect__input multiselect__input--${(selected.includes(option.id) || (option.isActive === false ? !option.isActive : null)) ? 'active' : 'inactive'}`}>
                  <input {...params} className='multiselect__hidden' />
                </div>
              </div>
              <div className='multiselect__field__section multiselect__field__section-label'>
                <label className={`multiselect__label multiselect__label--${(selected.includes(option.id) || (option.isActive === false ? !option.isActive : null)) ? 'active' : 'inactive'}`} htmlFor={option.id}>
                  {option.value ? option.value : 'Без типа'}
                </label>
                {!!option.hint && (
                <div className='multiselect__field__hint'>
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
export default Multiselect;
