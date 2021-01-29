import './List.style.css';
import './List.tablet.css';
import './List.mobile.css';

import React from 'react';
import shortid from 'shortid';

// TODO: Remove The fucking shortid. Component must be controlled.

const List = ({ children }) => {
  const content = children instanceof Array ? children : [children];

  return (
    <ul key={shortid.generate()} className='list'>
      {content.map((item) => {
        if (item) {
          const isArray = item.props.children instanceof Array;

          return (
            <li key={shortid.generate()} className={`list__item list__item--${isArray ? 'array' : 'default'}`}>
              <div className='list__content'>{item}</div>
            </li>
          );
        }
      })}
    </ul>
  );
};
export default List;
