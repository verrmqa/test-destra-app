import './Tabs.style.css';
import './Tabs.widescreen.css';
import './Tabs.tablet.css';
import './Tabs.mobile.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = ({ tabs }) => (
  <div className='tabs'>
    {tabs
      && tabs.map(tab => (
        <div
          key={`tabs_${tab.name}`}
          className={`tabs__section tabs__section-item ${
            tab.active ? 'tabs__section--active' : ''
            }`}
        >
          <Link to={tab.to} className='tabs__item'>
            {tab.name}
          </Link>
        </div>
      ))}
  </div>
);
export default Tabs;
