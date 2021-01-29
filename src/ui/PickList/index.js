import './PickList.style.css';
import './PickList.mobile.css';
import React from 'react';

const PickList = ({ items, onSelect, service }) => (
<div className='pick-list'>
      {items.map(item => (
        <div className='pick-list__item' key={item.data.hid} onClick={() => onSelect(item)}>
          <div className='pick-list__title'>{item.value}</div>
          <div className='pick-list__description'>{service === 'dadata:bic' ? item.data.bic : item.unrestricted_value}</div>
        </div>
      ))}
</div>
);

export default PickList;
