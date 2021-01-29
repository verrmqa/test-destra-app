import './Select.style.css';
import './Select.tablet.css';
import './Select.mobile.css';

import React, { useState, useEffect, useRef } from 'react';

// multi перепихать в пропсы из стейта

const Select = ({
  value,
  defaultValue,
  placeholder = 'Выберите из списка',
  id,
  multi,
  onChange,
  type,
  template = 'default'
}) => {
  let _defaultSelected = null;

  if (multi) {
    _defaultSelected = defaultValue || [];
  } else {
    _defaultSelected = value.find(item => item.id === Number(defaultValue));
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(_defaultSelected);
  const wrapperRef = useRef();
  const optionsRef = useRef();
  const fieldRef = useRef();

  useEffect(() => {
    if (wrapperRef.current && wrapperRef.current.children.length > 6) {
      wrapperRef.current.classList.add('scroll-wrapper');
    }
  });

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleOptionsPosition = () => {
    optionsRef.current.classList.remove('select__section-options--top');

    const rect = optionsRef.current.getBoundingClientRect();

    if (rect.top + rect.height >= window.innerHeight) {
      optionsRef.current.classList.add('select__section-options--top');
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);

    setTimeout(() => handleOptionsPosition(), 0);
  };

  const handleSelect = (option) => {
    if (multi) {
      onChange(id, option, type, multi);
      setSelected([...selected, option.id]);

      if (selected.includes(option.id)) {
        const array = [...selected];
        const index = array.indexOf(option.id);

        if (index !== -1) {
          array.splice(index, 1);
          setSelected(array);
        }
      }
    } else {
      onChange(id, option.id, type);
      setSelected(option);

      handleToggle();
    }
  };

  const settings = {
    className: `select__field select__field--${isOpen ? 'opened' : 'closed'} gtm_control_element`,
    onClick: handleToggle,
    role: 'select'
  };

  let children;

  if (multi) {
    children = selected.length > 0 ? value.map(el => selected.includes(el.id) && `${el.value}, `) : placeholder;
  } else {
    children = selected ? selected.value : placeholder;
  }

  return (
    <div role='button' className={`select select--${template}`} tabIndex={-1} onBlur={handleBlur}>
      <div className='select__section select__section-field'>
        <div {...settings}>
          {children}
          <input
            className='select__field__hidden'
            ref={fieldRef}
            onChange={() => { }}
            value={selected ? selected.id : null}
          />
        </div>
      </div>
      <div className='select__section select__section-options' ref={optionsRef}>
        <div className={`select__options select__options-${isOpen ? 'active' : 'inactive'}`}>
          {/* отрефакторить */}
          <div ref={wrapperRef}>
            {value.map((option) => {
              const active = (multi && selected.includes(option.id)) || selected === option;
              const params = {
                onClick: () => handleSelect(option),
                className: `select__options__section select__options__section--${active ? 'active' : 'inactive'}`
              };

              return (
                <div key={`${id}_${option.id}`} {...params}>
                  <div className='select__value'>{option.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='select__section select__section-selected'>
        {multi && (
          value.map((el) => {
            if (selected.includes(el.id)) {
              return (
                <div role='option' tabIndex={-1} key={el.id} onClick={() => handleSelect(el)} className='selected'>
                  {el.value}
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Select;
