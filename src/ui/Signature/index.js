import './Signature.style.css';
import React from 'react';

const Signature = ({ items }) => (
  <div className='signature'>
    {items && items.value.map((item, i) => (
      <div className='signature__item' key={`${items._id}_${i + 1}`}>
        <div className='signature__title'>{item.title ? item.title : 'Подпись'}</div>
        <div style={item.line ? { width: `${item.line}rem` } : { width: '12rem' }} className='signature__line' />
      </div>
    ))}
  </div>
);
export default Signature;
