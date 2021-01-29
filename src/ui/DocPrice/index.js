import './DocPrice.style.css';
import './DocPrice.tablet.css';
import './DocPrice.mobile.css';
import React from 'react';

const DocPrice = ({ price }) => (<span className='doc-price'>{price}</span>);

export default DocPrice;
