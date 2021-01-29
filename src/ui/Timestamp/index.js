import './Timestamp.style.css';
import React from 'react';

const Timestamp = ({ template = 'default', children }) => {
  const addZero = (_n) => {
    if (_n < 10) return `0${_n}`;
    return _n;
  };

  let value = '---';

  if (children) {
    const date = new Date(children);

    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    // const hours = this.addZero(date.getHours())
    // const minutes = this.addZero(date.getMinutes());

    value = `${day}.${month}.${date.getFullYear()}`;
  }


  return (
    <span className={`timestamp timestamp--${template}`}>
      {value}
    </span>
  );
};

export default Timestamp;
