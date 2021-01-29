import './DocumentsListItem.style.css';
import './DocumentsListItem.tablet.css';
import './DocumentsListItem.mobile.css';

import React from 'react';

import Icon from '../Icon';

const DocumentsListItem = ({ description, title, icon, href, onClick }) => (
  <a href={href} className='documents-list-item' onClick={onClick}>
    <div className='documents-list-item__section documents-list-item__section-header'>
      <div className='documents-list-item__header__icon'>
        <Icon name={icon} />
      </div>
      <div className='documents-list-item__header__title'>{title}</div>
    </div>
    <div className='documents-list-item__section documents-list-item__section-description'>
      <div className='documents-list-item__description'>{description}</div>
    </div>
  </a>
);
export default DocumentsListItem;
