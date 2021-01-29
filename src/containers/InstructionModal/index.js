import './InstructionModal.style.css';
import './InstructionModal.widescreen.css';
import './InstructionModal.tablet.css';
import './InstructionModal.mobile.css';

import React, { useState } from 'react';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

const InstructionModal = ({ title, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);

    document.body.style.overflow = (!isOpen) ? 'hidden' : 'auto';
  };

  return (
    <div className='stage__modal'>
      <Button template='blue' size='medium' onClick={handleModal}>{title}</Button>
      <Modal isOpen={isOpen} onClose={handleModal}>
        {value}
      </Modal>
    </div>
  );
};
export default InstructionModal;
