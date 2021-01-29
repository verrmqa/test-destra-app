import './OrElements.style.css';
import './OrElements.tablet.css';
import './OrElements.mobile.css';

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getTemplate } from '../../bootstrap/services/templateService';
import createDocument from '../../helpers/createDocument';

import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import { getDocuments } from '../../bootstrap/services/documentService';
import yandexMetrika from '../../helpers/yandexMetrika';

const OrElements = ({ value }) => {
  const [document, setDocument] = useState();
  const [oldDocument, setOldDocument] = useState(undefined);
  const [loading, handleLoading] = useState(false);
  const documentButton = value.find(_v => _v.action === 'document');
  const history = useHistory();

  useEffect(() => {
    if (typeof (window) !== 'undefined' && documentButton) {
      getTemplate(documentButton.id).then((data) => {
        if (data) setDocument(data);
      });
    }
  }, [documentButton]);

  const handleCreateDocument = () => {
    yandexMetrika('reachGoal', 'doc_instruction');
    if (window.gtag) window.gtag('event', 'click', { event_category: 'Button', event_label: 'create_doc_tutorial' });
    createDocument(document, history);
  };

  const handleDocumentCheck = () => {
    handleLoading(true);
    getDocuments().then((data) => {
      let old = data.find(oldDoc => oldDoc.template._id === document._id);
      data.map((doc) => {
        if (doc.template._id === document._id) {
          if (doc.created_at > old.created_at) old = doc;
        }
      });

      if (old) setOldDocument(old);
      else handleCreateDocument();

      handleLoading(false);
    }).catch(() => handleCreateDocument());
  };

  if (!document) return <div />; // Loader here

  return (
    <div className='or-elements'>
      {loading && (
        <div className='or-elements__section or-elements__section-loader'>
          <div className='or-elements__loader' />
        </div>
      )}
      <div className='or-elements__section or-elements__section-items'>
        {!oldDocument && value.map(item => (
          <div className='or-elements__item' key={item.id} id={item.action === 'document' && document && document.slug}>
            <div className='or-elements__item__section or-elements__item__section-icon'>
              <Icon name='docPlus' />
            </div>
            <div className='or-elements__item__section or-elements__item__section-text'>
              <div className='or-elements__item__title'>{document.title ? document.title : 'Создать документ'}</div>
              <div className='or-elements__item__description'>{item.value ? item.value : 'Грамотный документ - залог успеха'}</div>
            </div>
            <div className='or-elements__item__section or-elements__item__section-button'>
              <Button type='button' size='medium' onClick={handleDocumentCheck}>
                Создать документ
              </Button>
            </div>
          </div>
        ))}
        {oldDocument && (
          <div className='or-elements__edit'>
            <div className='or-elements__edit__section or-elements__edit__section-title'>
              <div className='or-elements__edit__title'>У вас уже есть такой документ</div>
            </div>
            <div className='or-elements__edit__section or-elements__edit__section-return'>
              <Button type='internal' icon='pen' size='medium' color='grey' href={`/account/documents/${oldDocument._id}`}>Продолжить редактирование</Button>
            </div>
            <div className='or-elements__edit__section or-elements__edit__section-new'>
              <Button type='button' size='medium' onClick={handleCreateDocument}>Создать новый</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrElements;
