import './DocCardHeader.style.css';
import './DocCardHeader.tablet.css';
import './DocCardHeader.mobile.css';


import React, { useState } from 'react';
import PromoCode from '../../containers/PromoCode';
import Title from '../Title';


const DocCardHeader = ({ transaction, title, user, price, isDocumentFilled, docDownload, handleDiscount }) => {
  const [discountField, handleDiscountField] = useState();
  const [oldPrice, handleOldPrice] = useState();
  const [promocodePosition, handlePromocodePosition] = useState(false);
  const renderPrice = () => {
    if (transaction && transaction.status === '2') return 'Оплачено';
    if (discountField) {
      return (
        <>
          {`${price} ₽`}
          <div className='docCardHeader__price__old'>{`${oldPrice} ₽`}</div>
          <div className='docCardHeader__price__discount'>{`-${discountField}%`}</div>
        </>
      );
    }
    if (price === 0) return 'Бесплатно';
    if (docDownload) return `${price} ₽`;
    if (isDocumentFilled && price !== 0 && (!transaction || transaction.status === '0' || transaction.status === '-1')) return `${price} ₽`;
    return <div className='docCardHeader__price--hide' />;
  };

  const handleDiscountProcess = (promocode) => {
    if (!discountField) {
      handleOldPrice(price);
      handleDiscount(promocode);
      handleDiscountField(promocode.discount);
    }
  };

  const onPromocodePosition = () => handlePromocodePosition(true);

  return (
    <div className='docCardHeader__main'>
      <div className='docCardHeader__main__section docCardHeader__main__section-pricing'>
        <div className='docCardHeader__pricing'>
          <div className='docCardHeader__pricing__section docCardHeader__pricing__section-title'>
            <Title level={6} template='card'>{title}</Title>
          </div>
          <div className='docCardHeader__pricing__section docCardHeader__pricing__section-price'>
            <div className='docCardHeader__price'>
              {renderPrice()}
            </div>
          </div>
          {(!transaction || transaction.status === '0' || transaction.status === '-1') && price !== 0 && isDocumentFilled && (
            <div onClick={onPromocodePosition} className={`docCardHeader__pricing__section docCardHeader__pricing__section-promocode ${promocodePosition ? 'docCardHeader__pricing__section-promocode--inherit' : 'docCardHeader__pricing__section-promocode--absolute'}`}>
              <PromoCode user={user} handleDiscount={handleDiscountProcess} />
            </div>
          )}
        </div>
      </div>
      <div className='docCardHeader__main__section docCardHeader__main__section-advantages'>
        <div className='docCardHeader__advantages'>
          <div className='docCardHeader__advantages__section docCardHeader__advantages__section-title'>
            <Title level={6} template='card'>ВЫ ПОЛУЧАЕТЕ</Title>
          </div>
          <div className='docCardHeader__advantages__section docCardHeader__advantages__section-list'>
            <ul className='docCardHeader__list'>
              <li className='docCardHeader__list__item'>Документ</li>
              <li className='docCardHeader__list__item'>Помощь в подаче документа</li>
              <li className='docCardHeader__list__item'>Консультация с юристом</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocCardHeader;
