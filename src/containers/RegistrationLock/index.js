import './RegistrationLock.style.css';
import './RegistrationLock.tablet.css';
import './RegistrationLock.mobile.css';

import React, { useState, useRef } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup, handleOpenAuth } from '../../features/Auth/redux/actions';

import Icon from '../../ui/Icon';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const mapDispatchToProps = dispatch => bindActionCreators({
  handleOpenAuthDispatcher: handleOpenAuth,
  signupDispatcher: signup
}, dispatch);

const RegistrationLock = ({
  handleOpenAuthDispatcher,
  handlePromoPay,
  signupDispatcher,
  user,
  message,
  promo
}) => {
  const [error, setError] = useState(undefined);
  const emailRef = useRef();

  const handleButtonClick = () => {
    handleOpenAuthDispatcher('instsignup');
  };

  const handlePromoButtonClick = () => {
    const emailRegexp = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;

    if (user) {
      handlePromoPay();
    } else if (!user && emailRef.current.value.match(emailRegexp)) {
      signupDispatcher({ email: emailRef.current.value })
        .then((res) => {
        if (res.data && res.data.error === 'Email already exists') {
          setError('Пожалуйста, авторизуйтесь');

          setTimeout(() => setError(undefined), 5000);
        } else {
          handlePromoPay();
        }
      });
    } else {
      setError('Некорректный e-mail адрес');

      setTimeout(() => setError(undefined), 5000);
    }
  };

  return (
    <div className='registration-lock'>
      <div className='registration-lock__section registration-lock__section--icon'>
        <Icon name='lock' />
      </div>
      <div className='registration-lock__section registration-lock__section--title'>
        <div className='registration-lock__message'>
          {message}
        </div>
      </div>
      {!user && (
        <div className='registration-lock__section registration-lock__section--input'>
          <Input error={error} placeholder='E-mail' size='medium' r={emailRef} />
        </div>
      )}
      <div className='registration-lock__section registration-lock__section--button'>
        <Button size='medium' onClick={promo ? handlePromoButtonClick : handleButtonClick} template='blue'>{promo ? 'Оплатить' : 'Зарегистрироваться'}</Button>
      </div>
    </div>
  );
};
export default connect(null, mapDispatchToProps)(RegistrationLock);
