import './ProgressBar.style.css';
import './ProgressBar.tablet.css';
import './ProgressBar.mobile.css';

import React from 'react';

const ProgressBar = ({ progress, quantity, template = 'default', withNumber = true }) => (
  <div className='progress progress--default'>
    <div className={`progress__bar progress__bar--${template}`} style={{ width: `${Math.floor(progress / quantity * 100)}%` }}>
     {withNumber ? (
        <div className='progress__bar__number' style={{ right: `${progress > 9 ? '-1.4' : '-1.1'}rem` }}>
        {progress}
        {quantity}
        </div>
       ) : null}
    </div>
  </div>
);

export default ProgressBar;
