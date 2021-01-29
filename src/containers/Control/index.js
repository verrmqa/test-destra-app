import './Control.style.css';
import './Control.tablet.css';
import './Control.mobile.css';

import React from 'react';

import checkCondition from '../../helpers/checkCondition';
import Render from '../Render';

import Checkbox from '../../ui/Checkbox';
import Select from '../../ui/Select'; 
import Multiselect from '../../ui/Multiselect';
import Toggle from '../../ui/Toggle';
import Radio from '../../ui/Radio';
import Title from '../../ui/Title';
import Hint from '../../ui/Hint';

const Control = ({ value, filter, handleChange }) => {
  const { id } = value;

  const filterValuesWithCondition = (values) => {
    const result = [];

    for (let i = 0; i < values.length; i++) {
      const filterValue = values[i];
      const display = checkCondition(filterValue.condition, filter);

      if (display) result.push(filterValue);
    }

    return result;
  };

  const renderControl = () => {
    const { label, _type } = value;
    const params = {
      id: value.id,
      defaultValue: filter ? filter[value.id] : null,
      onChange: handleChange,
      label,
      type: _type,
      value: value.value instanceof Array ? filterValuesWithCondition(value.value) : value.value,
    };

    switch (_type) {
      case 'checkbox':
        return <Checkbox {...params} />;
      case 'select':
        return <Select {...params} />;
      case 'multiselect':
        return <Multiselect {...params} />;
      case 'toggle':
        return <Toggle {...params} />;
      case 'radio':
        return <Radio {...params} />;
      default:
    }
  };

  return (
    <div data-id={id} className={`control control--${value._type}`}>
      <div className={`control__section control__section-header control__section--${value._type}`}>
      <div className='control__header'>
        <div className='control__header__section control__header__section-title'>
          <Title level={6} template='black'>{value.label}</Title>
        </div>
        {!!value.hint && (
          <div className='control__header__section control__header__section-hint'>
            <Hint template='control'>
              <Render element={{ value: value.hint }} />
            </Hint>
          </div>
        )}
      </div>
      </div>
      <div className={`control__section control__section-element control__section--${value._type}`}>
        {renderControl()}
      </div>
    </div>
  );
};
export default Control;
