import React from 'react';

export default ({ color = '#3F3F46' }) => (
  <svg className='icon icon--profile' width='1.25rem' height='1.25rem' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g>
      <path d='M8.99993 8.27538C11.3196 8.27538 13.2001 6.42288 13.2001 4.13769C13.2001 1.85251 11.3196 0 8.99993 0C6.68027 0 4.7998 1.85251 4.7998 4.13769C4.7998 6.42288 6.68027 8.27538 8.99993 8.27538Z' fill={color} />
      <path d='M15.3 15.4292C15.3 18.8569 2.69995 18.8569 2.69995 15.4292C2.69995 12.0015 5.52049 9.22266 8.99995 9.22266C12.4794 9.22266 15.3 12.0015 15.3 15.4292Z' fill={color} />
    </g>
    <defs>
      <clipPath id='clip0'>
        <rect width='1.25rem' height='1.25rem' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
