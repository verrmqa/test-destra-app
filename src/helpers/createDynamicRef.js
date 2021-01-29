import { useRef } from 'react';

const createDynamicRef = (array, refKeyFieldName = 'id') => {
  const refs = {};

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    refs[item[refKeyFieldName]] = useRef();
  }

  return refs;
};
export default createDynamicRef;
