import './Burger.tablet.css';
import './Burger.mobile.css';
import React from 'react';

const Burger = ({ template, onClick, isOpen }) => (
  <div onClick={onClick} className={`burger burger--${isOpen ? 'active' : 'inactive'} burger---${template}`}>
    <div className='burger__section-lines'>
      <div className='burger__line burger__line--top' />
      <div className='burger__line burger__line--bottom' />
    </div>
  </div>
  );
  export default Burger;
