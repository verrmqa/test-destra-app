import React from 'react';


export default ({ color = '#5E9CDF' }) => (
  <svg className='icon icon--togglelink' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='5' y='3' width='3' height='9' rx='1' transform='rotate(-90 5 3)' fill={color} />
    <rect width='3' height='3' rx='1.5' transform='matrix(1 0 0 -1 0 3)' fill={color} />
    <rect x='5' y='8.5' width='3' height='9' rx='1' transform='rotate(-90 5 8.5)' fill={color} />
    <rect width='3' height='3' rx='1.5' transform='matrix(1 0 0 -1 0 8.5)' fill={color} />
    <rect x='5' y='14' width='3' height='9' rx='1' transform='rotate(-90 5 14)' fill={color} />
    <rect width='3' height='3' rx='1.5' transform='matrix(1 0 0 -1 0 14)' fill={color} />
  </svg>
);
