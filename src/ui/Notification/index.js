import './Notification.style.css';
import './Notification.tablet.css';
import './Notification.mobile.css';

import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import Icon from '../Icon';


const Notification = forwardRef((props, ref) => {
  const [items, handleItems] = useState([]);
  const itemsRef = useRef(items);
  const wrapper = useRef();
  itemsRef.current = items;

  const handleNewNotification = (newItem) => {
    if (items.length > 4) items.shift();
    handleItems([...items, newItem]);

    wrapper.current.classList.add('notification--new');

    setTimeout(() => {
      wrapper.current.classList.remove('notification--new');
    }, 500);

    setTimeout(() => {
      const _items = itemsRef.current;
      _items.shift();
      handleItems([..._items]);
    }, 5000);
  };

  const handleCloseNotification = (id) => {
    items.map((item) => {
      if (item.id === id) items.splice(items.indexOf(item), 1);
      handleItems([...items]);
    });
  };

  useImperativeHandle(ref, () => ({
      handleNewNotification
    }));

  return (
    <div className='notification notification--new' ref={wrapper}>
      {items && items.map(item => (
        <div className={`notification__item notification__item--${item.template ? item.template : 'default'}`} key={item.id}>
          {item.icon && (
            <div className='notification__item__section notification__item__section-icon'>
              <Icon name={item.icon} />
            </div>
          )}
          <div className='notification__item__section notification__item__section-text'>
            <div className='notification__item__text'>
              {item.bold && <div className='notification__item__text--bold'>{item.bold}</div>}
              {item.text}
            </div>
          </div>
          <div className='notification__item__section notification__item__section-button'>
            <div className='notification__item__button' onClick={() => handleCloseNotification(item.id)} />
          </div>
        </div>
      ))}
    </div>
  );
});

export default Notification;
