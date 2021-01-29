import React from 'react';

export default ({ color = '#252D39' }) => (
  <svg className='icon icon--squares' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='20' cy='20' r='20' fill='white' />
    <rect x='14' y='14' width='5' height='5' rx='1' fill={color} />
    <rect x='14' y='21' width='5' height='5' rx='1' fill={color} />
    <rect x='21' y='14' width='5' height='5' rx='1' fill={color} />
    <rect x='21' y='21' width='5' height='5' rx='1' fill={color} />
  </svg>
);
