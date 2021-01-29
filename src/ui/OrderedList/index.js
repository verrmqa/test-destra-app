import './OrderedList.style.css';
import './OrderedList.tablet.css';
import './OrderedList.mobile.css';

import React from 'react';
import shortid from 'shortid';

// TODO: Remove the fucking shortid. Component should be controlled.

const OrderedList = ({ children, template = 'default' }) => {
  const content = children instanceof Array ? children : [children];

  return (
    <ol key={shortid.generate()} className={`ordered-list ordered-list--${template}`}>
      {content.map((item) => {
        if (item) {
          const isArray = item.props.children instanceof Array;

          return (
            <li key={shortid.generate()} className={`ordered-list__item ordered-list__item--${isArray ? 'array' : 'default'}`}>
              <div className='ordered-list__content'>{item}</div>
            </li>
          );
        }
      })}
    </ol>
  );
};
export default OrderedList;
