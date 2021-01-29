import React, { createContext, useState } from 'react';

const DocumentInputContext = createContext({
  fields: [],
  values: [],
  reference: () => {},
  handleChange: () => {}
});

const DocumentInputContextProvider = ({ children, value, handleChange, reference }) => {
  const [values, setValues] = useState([]);
  const setValue = (id, e) => {
    const newValues = [...values];

    newValues[id] = e.target.value;

    setValues(newValues);
  };

  return (
    <DocumentInputContext.Provider value={{
      fields: value,
      handleChange: (id, e) => {
        setValue(id, e);

        return handleChange;
      },
      reference
    }}
    >
      {children}
    </DocumentInputContext.Provider>
  );
};

export {
  DocumentInputContext,
  DocumentInputContextProvider
};
