import './Render.style.css';
import './Render.widescreen.css';
import './Render.tablet.css';
import './Render.mobile.css';

import React from 'react';
import shortid from 'shortid';

import InstructionModal from '../InstructionModal';
import Section from '../Section';
import OrElements from '../OrElements';
import CalcButton from '../CalcButton'; 
import InlineInput from '../InlineInput';
import DocsPack from '../DocsPack';

import Title from '../../ui/Title';
import List from '../../ui/List';
import OrderedList from '../../ui/OrderedList';
import Link from '../../ui/Link';
import Text from '../../ui/Text';
import Hint from '../../ui/Hint';
import Note from '../../ui/Note';
import Collapse from '../../ui/Collapse';
import Signature from '../../ui/Signature';
import InstButton from '../InstButton';
import DocPrice from '../../ui/DocPrice';


const Render = ({ element, template, handleInputChange, values, fieldRef, fieldErrors, handleCallbackInput, price }) => {
  let content;
  if (typeof (element) === 'object') {
    /*
      Element is Object
      Common case.
    */
    if (element.value instanceof Array) {
      /*
        Element Value is Array
        Example:
          {
            "_type": "hint",
            "value": [
              {
                "_type": "title",
                "level": "5",
                "value": "Example with array of elements"
              },
              {
                "_type": "text",
                "size": "14",
                "value": "Something inside hint"
              },
              "This is Text without any parameters"
            ]
          }
      */
    content = element.value.map(children => Render(
      { element: children, fieldErrors, fieldRef, handleInputChange, values, handleCallbackInput, template, price }
));
    } else if (typeof (element.value) === 'object') {
      /*
        Element Value is Object
        Example:
          {
            "_type": "note",
            "value": {
              "_type": "text",
              "size": "14",
              "value": "Single text inside Note element"
            }
          }
      */
      content = Render({ element: element.value, fieldErrors, fieldRef, handleInputChange, values, handleCallbackInput, template, price });
    } else {
      /*
        Element Value is String
        Example:
          {
            "_type": "text",
            "size": "14",
            "value": "This is a string"
          }
      */
      content = element.value;
    }
  } else {
    /*
      Element itself is String.
      This is special case, when string have %h (format) or {%input%} inside.
      Look render:35 (Element.value instance of Array) for reference.
    */
    content = element;
  }

  let { _type } = element || 'block';
  const key = (element && element._id) || shortid.generate();
  let fieldValue;
  let fieldError = false;

  if (element instanceof Object) {
    element.template = template || 'default';
  }

  if (values && values[element.id]) {
    fieldValue = values[element.id];
  }

  if (fieldErrors && fieldErrors.indexOf(element.id) >= 0) {
    fieldError = true;
  }

  if (_type && _type.includes(':')) [_type] = _type.split(':');

  switch (_type) {
    case 'title':
      return <Title key={key} {...element}>{content}</Title>;
    case 'ul':
      return <List key={key}>{content}</List>;
    case 'ol':
      return <OrderedList key={key} {...element}>{content}</OrderedList>;
    case 'link':
      return <Link key={key} href={element.href} template='blue' type='external' size={14}>{content}</Link>;
    case 'text':
      return <Text key={key} size={14} {...element}>{content}</Text>;
    case 'hint':
      return <Hint key={key} {...element}>{content}</Hint>;
    case 'collapse':
      return <Collapse key={key} {...element}>{content}</Collapse>;
    case 'note':
      return <Note key={key} {...element}>{content}</Note>;
    case 'b':
      return <b className='stage__bold' key={key}>{content}</b>;
    case 'i':
      return <i className='stage__italic' key={key}>{content}</i>;
    case 'image':
      return <img alt={content} title={content} className='stage__image' src={content} key={key} />;
    case 'iframe':
      return <iframe title={content} className='stage__iframe' src={content} height={element.height} key={key} />;
    case 'or_elements':
      return <OrElements key={key} {...element} />;
    case 'docspack':
      return <DocsPack key={key} {...element} />;
    case 'modal':
      return <InstructionModal key={key} value={content} title={element.title} />;
    case 'instbutton':
      return <InstButton key={key} {...element} />;
    case 'calcbutton':
      return <CalcButton key={key} {...element} />;
    case 'section':
      return <Section key={key} {...element}>{content}</Section>;
    case 'signature':
      return <Signature key={key} items={element} />;
    case 'docprice':
      return <DocPrice key={key} price={price} />;
    case 'input':
    case 'number':
    case 'callback':
    case 'price':
    case 'email':
      return (
        <InlineInput
          r={fieldRef}
          error={fieldError}
          filled={!!fieldValue}
          defaultValue={fieldValue}
          onChange={handleInputChange}
          handleCallbackInput={handleCallbackInput}
          key={key}
          {...element}
        />
      );
    case 'date':
      return (
        <InlineInput
          r={fieldRef}
          error={fieldError}
          filled={!!fieldValue}
          defaultValue={fieldValue}
          onChange={handleInputChange}
          mask={{ mask: '99.99.9999' }}
          key={key}
          {...element}
        />
      );
    case 'phone':
      return (
        <InlineInput
          r={fieldRef}
          error={fieldError}
          filled={!!fieldValue}
          defaultValue={fieldValue}
          onChange={handleInputChange}
          mask={{ mask: '+7 (999) 999-99-99' }}
          key={key}
          {...element}
        />
      );
    case 'tin':
      return (
        <InlineInput
          r={fieldRef}
          error={fieldError}
          filled={!!fieldValue}
          defaultValue={fieldValue}
          onChange={handleInputChange}
          mask={{ mask: '999999999999' }}
          key={key}
          {...element}
        />
      );
    case 'esn':
      return (
        <InlineInput
          r={fieldRef}
          error={fieldError}
          filled={!!fieldValue}
          defaultValue={fieldValue}
          onChange={handleInputChange}
          mask={{ mask: '9999999999999' }}
          key={key}
          {...element}
        />
      );
    case '_render':
      return <div className='render' key={key}>{content}</div>;

    case 'block':
    default:
      return <React.Fragment key={key}>{content}</React.Fragment>;
  }
};

export default props => Render(props);
