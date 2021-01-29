import './MultiPicker.style.css';
import './MultiPicker.tablet.css';
import './MultiPicker.mobile.css';

import React, { useEffect, useState } from 'react';

const MultiPicker = ({ item, handleChange, defaultValue }) => {
  const [selected, handleSelect] = useState({});

  useEffect(() => {
    if (item._type === 'multiselect' && defaultValue) {
      selected[item.id] = defaultValue;
      handleSelect({ ...selected });
    }
  }, [defaultValue]);

  const handlePick = (el, value) => {
    if (item._type === 'multiselect') {
      if (!defaultValue) {
        if (selected[item.id] instanceof Array) {
          // if item already have any value
          if (selected[item.id].includes(value)) selected[item.id].splice(selected[item.id].indexOf(value), 1);
          else selected[item.id].push(value);
        } else {
          // if item don't have any value
          selected[item.id] = [];
          selected[item.id].push(value);
        }
      }
    } else selected[el.id] = [value];

    handleChange(el.id, value, el._type);
  };

  return (
    <div className='multipicker'>
      {item.value.map(field => (
        <div className='multipicker__section' key={`${item.id}_${field.id}`}>
          <div className={`multipicker__item multipicker__item--${selected[item.id] && selected[item.id].includes(field.id) ? 'active' : 'inactive'}`} onClick={() => handlePick(item, field.id)}>
            <div className='multipicker__item__section multipicker__item__section-title'>
              <div className='multipicker__item__title'>
                {field.value}
              </div>
            </div>
            {item._type === 'multiselect' && (
              <div className='multipicker__item__section multipicker__item__section-checkbox'>
                <div className='multipicker__item__checkbox' />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiPicker;
