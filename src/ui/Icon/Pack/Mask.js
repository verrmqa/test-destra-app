import React from 'react';

export default ({ color = '#777777' }) => (
  <svg className='icon icon--mask' viewBox='0 0 30 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M28.828 1.31064C28.3013 0.596635 27.5719 0.219299 26.7187 0.219299C24.8208 0.219299 23.332 2.83721 22.4982 4.5944L18.9704 2.96611C16.5151 1.83387 13.6115 1.77563 11.03 2.96611L7.50216 4.5944C6.67425 2.84957 5.17809 0.219299 3.28168 0.219299C2.4284 0.219299 1.69904 0.596693 1.17235 1.31064C-0.0609012 2.98235 0.000503626 6.36987 0.000503626 8.65662C0.000503626 11.4093 1.15355 13.9729 3.335 16.0705C4.83972 17.5173 6.3425 18.2718 6.60112 18.396C7.14562 18.6946 4.80397 17.4279 11.0299 20.7805C13.5786 22.1519 16.5634 22.0762 18.9704 20.7805C25.2269 17.4114 22.8363 18.7043 23.3991 18.396C23.6578 18.2718 25.1606 17.5173 26.6652 16.0705C28.8467 13.9729 29.9997 11.4093 29.9997 8.65662C29.9999 6.25438 30.0393 2.95258 28.828 1.31064ZM1.87546 8.65656C1.87546 6.36313 1.87546 2.0942 3.28168 2.0942C3.51828 2.0942 4.15588 2.48823 5.0452 3.965C5.55742 4.81559 5.94477 5.68252 6.09412 6.03208V15.9126C4.4523 14.767 1.87546 12.3763 1.87546 8.65656ZM23.9062 15.9126V6.03208C24.0556 5.68258 24.4429 4.81559 24.9552 3.965C25.8445 2.48823 26.4821 2.0942 26.7187 2.0942C28.1249 2.0942 28.1249 6.36313 28.1249 8.65656C28.1249 11.7248 26.3815 14.1885 23.9062 15.9126Z' fill={color} />
  </svg>
);