import './Breadcrumbs.style.css';
import React from 'react';
import { Link } from 'react-router-dom';


const Breadcrumbs = ({ items, template = 'default' }) => (
  <nav itemScope itemType='http://schema.org/BreadcrumbList' className='breadcrumbs'>
    {items.map((item, i) => {
      const last = (items.length !== 1) && (i === items.length - 1);
      const params = {
        to: item.to,
        className: `breadcrumbs__item breadcrumbs__item-${last ? 'last' : 'common'} breadcrumbs__item--${template || 'default'}`
      };

      if (last) {
        return (
          <span key={item.to} className='breadcrumbs__item__wrapper' itemProp='itemListElement' itemScope itemType='http://schema.org/ListItem'>
            <span itemProp='item' content={item.to} className={params.className}>
              <span className='breadcrumbs__item__name' itemProp='name'>{item.title}</span>
            </span>
            <meta className='breadcrumbs__meta' itemProp='position' content={i + 1} />
          </span>
        );
      }

      return (
        <span key={item.to} className='breadcrumbs__item__wrapper' itemProp='itemListElement' itemScope itemType='http://schema.org/ListItem'>
          <Link itemProp='item' {...params}>
            <span className='breadcrumbs__item__name' itemProp='name'>{item.title}</span>
          </Link>
          <meta className='breadcrumbs__meta' itemProp='position' content={i + 1} />
        </span>
      );
    })}
  </nav>
);
export default Breadcrumbs;
