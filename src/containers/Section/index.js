import './Section.style.css';
import './Section.widescreen.css';
import './Section.tablet.css';
import './Section.mobile.css';

import React, { useRef } from 'react';
import shortid from 'shortid';

import Title from '../../ui/Title';

const Section = ({ title, children, _id }) => {
  const containerRef = useRef();

  return (
    <div ref={containerRef} id={_id || shortid.generate()} className='section section--default'>
      <div className='section__title'>
        <Title level={6} template='black'>{`${title}`}</Title>
      </div>
      <div className='section__content'>
        {children}
      </div>
    </div>
  );
};
export default Section;
