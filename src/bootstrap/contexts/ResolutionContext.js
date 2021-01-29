import React, { createContext, useState, useEffect } from 'react';

const ResolutionContext = createContext(typeof (window) !== 'undefined' && window.innerWidth <= 1024);

const ResolutionContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(typeof (window) !== 'undefined' && window.innerWidth <= 1024);

  useEffect(() => {
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 1024));

    return () => {
      window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 1024));
    };
  }, []);

  return (
    <ResolutionContext.Provider value={isMobile}>
      {children}
    </ResolutionContext.Provider>
  );
};

export {
  ResolutionContext,
  ResolutionContextProvider
};
