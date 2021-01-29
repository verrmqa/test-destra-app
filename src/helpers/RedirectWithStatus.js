import React from 'react';

import { Route } from 'react-router-dom';

const RedirectWithStatus = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
                if (staticContext) staticContext.status = code;
                    return children;
            }}
  />
    );

export default RedirectWithStatus;
