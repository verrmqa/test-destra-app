import './CallbackInput.style.css';
import './CallbackInput.mobile.css';
import React, { useState, useRef, useEffect } from 'react';
import PickList from '../../ui/PickList';
import Input from '../../ui/Input';

import { getBankData, getOrganizationData, getAddressData } from '../../bootstrap/services/dadataService';
import isWindowDefined from '../../helpers/isWindowDefined';


const CallbackInput = ({ onChange, r, onBlur, defaultValue, onKeyPress, service, matching, handleCallbackInput, placeholder,
  size, error, visibleInnerButton }) => {
  const input = useRef();
  const field = useRef();
  const [pickListData, handlePickListData] = useState([]);

  const mobile = typeof window !== 'undefined' && window.outerWidth <= 450;
  const docPromoView = isWindowDefined() && document.cookie.includes('doc_promo_view=true');
  const objectValueFinder = (path, obj) => path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);

  const email = (value) => {
    handleCallbackInput(value, service);
  };

  const handleBlur = () => {
    if (mobile || docPromoView) {
      setTimeout(() => {
        handlePickListData([]);
      }, 500);
    }
    const { value } = field.current;
    if (onBlur instanceof Function) onBlur({ target: field.current });
    if (service === 'email') email(value);
  };

  useEffect(() => {
    if (!mobile && !docPromoView) {
      document.addEventListener('click', (e) => { if (input.current && !input.current.contains(e.target)) handleBlur(); });
      return document.removeEventListener('click', (e) => { if (input.current && !input.current.contains(e.target)) handleBlur(); });
    }
  }, []);

  const handlePickList = (el) => {
    const match = [];
    matching.map((condition) => {
      match.push({ id: condition.fieldId, value: objectValueFinder(condition.responceValueID, el) });
    });

    if (mobile || docPromoView) handlePickListData([]);

    switch (service) {
      case 'dadata':
        field.current.value = el.data.name.short_with_opf;
        break;
      case 'dadata:address':
        field.current.value = el.unrestricted_value;
        break;
      case 'dadata:bic':
        field.current.value = el.data.bic;
        break;
      default:
        field.current.value = el.data.name.short;
    }

    if (onChange instanceof Function) onChange({ target: field.current });
    if (onBlur instanceof Function) onBlur({ target: field.current });

    handleCallbackInput(match, service);
  };

  const daData = () => {
    getOrganizationData(field.current.value).then((resp) => {
      handlePickListData([...resp.suggestions]);
    });
  };

  const daDataBank = () => {
    getBankData(field.current.value).then((resp) => {
      handlePickListData([...resp.suggestions]);
    });
  };

  const daDataAddress = () => {
    getAddressData(field.current.value).then((resp) => {
      handlePickListData([...resp.suggestions]);
    });
  };

  const handleSwitch = (type) => {
    switch (type) {
      case 'dadata':
        return daData();
      case 'dadata:bank':
        return daDataBank();
      case 'dadata:bic':
        return daDataBank();
      case 'dadata:address':
        return daDataAddress();
      // case 'email':
      //   return email();
      default:
    }
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
    handleSwitch(service);
  };

  const handleKeyPress = (e) => {
    if (onKeyPress) onKeyPress(e);
    const key = e.which || e.keyCode;
    if (key === 13) {
      if (service === 'email') email(field.current.value);
    }
  };

  return (
    <div className='callback-input' ref={input}>
      <div className='callback-input__section callback-input__section-field'>
        <Input
          defaultValue={defaultValue}
          onChange={handleChange}
          error={error}
          onKeyPress={handleKeyPress}
          onBlur={(mobile || docPromoView) ? handleBlur : null}
          placeholder={placeholder}
          icon='search'
          iconColor='#979797'
          size={size}
          visibleInnerButton={visibleInnerButton}
          r={(e) => {
            field.current = e;

            if (r instanceof Function) return r(e);
          }}
        />
      </div>
      {service !== 'email' && (
        <div className='callback-input__section callback-input__section-list'>
          <PickList items={pickListData} onSelect={handlePickList} service={service} />
        </div>
      )}
    </div>
  );
};

export default CallbackInput;
