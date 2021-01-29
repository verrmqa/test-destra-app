import './Contents.style.css';
import './Contents.tablet.css';
import './Contents.mobile.css';

import React, { useState, useContext, useRef } from 'react';
import { ResolutionContext } from '../../../bootstrap/contexts/ResolutionContext';

const Contents = ({ items }) => {
  const [selected, setSelected] = useState({ index: 1, item: item[0] });
  const contentsRef = useRef();
  const optionsRef = useRef();
  const isMobile = useContext(ResolutionContext);

  const handleClick = (item, i) => {
    setSelected({ index: i + 1, item });

    if (isMobile) {
      Array.from(document.querySelectorAll('.stage')).map(el => el.classList.remove('stage--open'));

      document.querySelectorAll('.stage')[i].classList.toggle('stage--open');
    }
    window.location.hash = 'stage_';
    window.location.hash = `stage_${i + 1}`;
  };

  const handleOptionsPosition = () => {
    optionsRef.current.classList.remove('content__options--top');

    const rect = optionsRef.current.getBoundingClientRect();

    if (rect.top + rect.height >= window.innerHeight) {
      optionsRef.current.classList.add('content__options--top');
    }
  };

  const handleOptions = () => {
    contentsRef.current.classList.toggle('contents--open');
    handleOptionsPosition();
  };

  const handleBlur = () => {
    contentsRef.current.classList.toggle('contents--open');
  };

  return (
    <div className='contents' ref={contentsRef} role='button' tabIndex={-2} onBlur={handleBlur}>
      <div className='contents__field' onClick={handleOptions}>
        {`${selected.index}. ${selected.item.title}`}
      </div>
      <div className='contents__options' ref={optionsRef}>
        {items.map((item, i) => (
          <div className='contents__option'>
            <input className='contents__option__input' name='contents' checked={i + 1 === Number(selected.index)} type='radio' id={item._id} />
            <label className='contents__option__label' onClick={() => handleClick(item, i)} htmlFor={item._id}>
              {item.title}
            </label>
          </div>
      ))}
      </div>
    </div>
  );
};
export default Contents;
