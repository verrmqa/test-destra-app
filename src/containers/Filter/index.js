import './Filter.style.css';
import './Filter.widescreen.css';
import './Filter.tablet.css';
import './Filter.mobile.css';

import React, { useState, useEffect } from 'react';

import checkCondition from '../../helpers/checkCondition';

import Control from '../Control';
import Button from '../../ui/Button';

const Filter = ({ values, handleChange, filter, type }) => {
  const [itemsShown, handleShownItems] = useState(values.length);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  let index = 0;

  useEffect(() => {
    if (isMobile && type === 'instruction') handleShownItems(3);
  }, []);

  const handleClick = () => {
    if (itemsShown === values.length) handleShownItems(3);
    else handleShownItems(values.length);
  };

  return (
    <div className='filter'>
      {values.map((value) => {
        const className = `filter__section filter__section-${value._type}`;

        if (checkCondition(value.condition, filter)) {
          index += 1;
          const params = {
            checkCondition, // TODO: move from props to @helpers
            value,
            handleChange,
            filter
          };

          if (index <= itemsShown) {
            return (
              <div key={value._id} className={className}>
                <Control {...params} />
              </div>
            );
          }
        }
      })}
      {isMobile && type === 'instruction' && index > 3 && (
        <div className='filter__section filter__section-button'>
          <Button size='medium' color='transparent' onClick={handleClick}>{itemsShown === values.length ? 'Свернуть' : 'Все параметры'}</Button>
        </div>
      )}
    </div>
  );
};
export default Filter;
