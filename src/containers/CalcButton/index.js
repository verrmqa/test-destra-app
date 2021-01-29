import './CalcButton.style.css';
import './CalcButton.widescreen.css';
import './CalcButton.tablet.css';
import './CalcButton.mobile.css';

import React, { useEffect, useState } from 'react';

import { getCalculator } from '../../bootstrap/services/calculatorService';

import Calculator from '../Calculator';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

const CalcButton = ({ id, title }) => {
  const [isOpen, setOpen] = useState(false);
  const [calculator, setCalculator] = useState();
  const handleModal = () => {
    setOpen(!isOpen);

    document.body.style.overflow = (!isOpen) ? 'hidden' : 'auto';
  };

  useEffect(() => {
    if (typeof (window) !== 'undefined') {
      getCalculator(id).then(data => setCalculator(data));
    }
  }, [id]);

  return (
    <div className='calcButton'>
      <Button icon='calculator' size='small' color='blue-opacity' onClick={handleModal}>{title}</Button>
      <Modal isOpen={isOpen} template='calc' onClose={handleModal}>
        {calculator && <Calculator template='small' calculator={calculator} />}
      </Modal>
    </div>
  );
};
export default CalcButton;
