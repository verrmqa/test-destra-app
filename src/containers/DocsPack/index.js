import './DocsPack.style.css';
import './DocsPack.tablet.css';
import './DocsPack.mobile.css';
import React, { useState, useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getTemplate } from '../../bootstrap/services/templateService';
import { makeOrder } from '../../bootstrap/services/orderService';
import { handleOpenAuth, signup } from '../../features/Auth/redux/actions';
import { createDoc } from '../../bootstrap/services/documentService';
import generateFilter from '../../helpers/generateFilter';
import createDocument from '../../helpers/createDocument';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Icon from '../../ui/Icon';
import Input from '../../ui/Input';
import Link from '../../ui/Link';

const DocsPack = ({ title, description, price, value, signupDispatcher, handleOpenAuthDispatcher, user }) => {
  const [isModalOpen, handleModal] = useState(false);
  const [docs, handleDocs] = useState([]);
  const [oldPrice, handleOldPrice] = useState(0);
  const [registrationError, handleRegistrationError] = useState(undefined);
  const email = useRef();
  const history = useHistory();

  useEffect(() => {
    if (typeof (window) !== 'undefined' && value.length > 0) {
      let _oldPrice = 0;
      value.map((doc) => {
        getTemplate(doc).then((data) => {
          docs.push(data);
          _oldPrice += data.price;

          handleOldPrice(_oldPrice);
          handleDocs([...docs]);
        });
      });
    }
  }, []);

  const handlePayment = (items) => {
    makeOrder({ price, items, redirect_url: `${window.location.origin}/account/documents/${docs[0]._id}` });
    handleModal(false);
  };

  const handleOrder = () => {
    const emailRegexp = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
    // if no user
    if (!user) {
      // check email
      if (!email.current.value.match(emailRegexp)) {
        handleRegistrationError('Некорректный E-mail');
        return setTimeout(() => { handleRegistrationError(undefined); }, 3000);
      }
      // signup
      return signupDispatcher({ email: email.current.value }).then((data) => {
        if (data.data && data.data.error === 'Email already exists') {
          handleRegistrationError('Пожалуйста, авторизуйтесь. Такая почта уже зарегистрирована');
          return setTimeout(() => {
            handleRegistrationError(undefined);
            handleOpenAuthDispatcher('login');
          }, 1000);
        }

        // Metrics registration trigger


        const items = [];

        docs.map((template) => {
          createDoc({ template: template._id, filter: generateFilter(template, '') });
          items.push({ _id: template._id, _type: 'document' });
        });

        handlePayment(items);
      });
    }

    const items = [];

    docs.map((template) => {
      createDoc({ template: template._id, filter: generateFilter(template, '') });
      items.push({ _id: template._id, _type: 'document' });
    });

    handlePayment(items);
  };

  const handleCreateDocument = (doc) => {
    createDocument(doc, history);
  };

  return (
    <div className='docspack'>
      <div className='docspack__section docspack__section-title'>
        <div className='docspack__title'>
          {title}
        </div>
      </div>
      <div className='docspack__section docspack__section-description'>
        <div className='docspack__description'>
          {description}
        </div>
      </div>
      <div className='docspack__section docspack__section-items'>
        {docs && docs.map(doc => (
          <div className='dockspack__item' key={`dockspack__${doc._id}`} onClick={() => handleCreateDocument(doc)}>
            <div className='dockspack__item__section dockspack__item__section-icon'>
              <Icon name='document-blank' />
            </div>
            <div className='dockspack__item__section dockspack__item__section-title'>
              <div className='dockspack__item__title'>
                {doc.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='docspack__section docspack__section-control'>
        <div className='docspack__control'>
          <div className='docspack__control__section docspack__control__section-price'>
            <div className='docspack__price'>
              <div className='dockspack__price__old'>{`${oldPrice} ₽`}</div>
              <div className='dockspack__price__new'>{`${price} ₽`}</div>
            </div>
          </div>
          <div className='docspack__control__section docspack__control__section-button'>
            <Button template='document' onClick={() => (user ? handleOrder() : handleModal(true))}>Создать документы</Button>
          </div>
        </div>
      </div>
      <div className='docspack__section docspack__section-modal'>
        <Modal isOpen={isModalOpen} onClose={() => handleModal(false)}>
          <div className='docspack__modal'>
            <div className='docspack__modal__section docspack__modal__section-title'>
              <div className='dockspack__modal__title'>{title}</div>
            </div>
            <div className='docspack__modal__section docspack__modal__section-description'>
              <div className='dockspack__modal__description'>
                Вы ещё не зарегистрированы на нашем сайте, введите свой Email адрес для того, чтобы создать документы
              </div>
            </div>
            <div className='docspack__modal__section docspack__modal__section-input'>
              <Input error={registrationError} r={(e) => { email.current = e; }} size='medium' placeholder='email@email.ru' />
            </div>
            <div className='docspack__modal__section docspack__modal__section-button'>
              <Button onClick={handleOrder} template='document'>Создать документы</Button>
            </div>
            <div className='docspack__modal__section docspack__modal__section-privacy'>
              <div className='dockspack__privacy'>
                Нажимая кнопку «Создать документы», я даю свое согласие на обработку персональных данных в соответствии с
                {' '}
                <Link target='_blank' href='/privacy.pdf' type='external'>Политикой конфиденциальности</Link>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({
  handleOpenAuthDispatcher: handleOpenAuth,
  signupDispatcher: signup
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocsPack);
