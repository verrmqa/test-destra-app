import './Deck.style.css';
import './Deck.widescreen.css';
import './Deck.tablet.css';
import './Deck.mobile.css';

import React from 'react';

const Deck = () => (
  <div className='deck'>
    <div className='deck__section deck__section-card'>
      <div className='deck__card deck__card--1' />
    </div>
    <div className='deck__section deck__section-card'>
      <div className='deck__card deck__card--2' />
    </div>
    <div className='deck__section deck__section-card'>
      <div className='deck__card deck__card--3' />
    </div>
  </div>
  );
  export default Deck;
