import { routerReducer } from 'react-router-redux';
import {
  compose, createStore, applyMiddleware, combineReducers
} from 'redux';
import thunk from 'redux-thunk';

import catalog from '../../Catalog/redux/reducer';
import landing from '../../Landing/redux/reducer';
import category from '../../Category/redux/reducer';
import instruction from '../../Instruction/redux/reducer';
import document from '../../Document/redux/reducer';
import calculator from '../../CalculatorPage/redux/reducer';

import search from '../../Search/redux/reducer';
import auth from '../../Auth/redux/reducer';
import account from '../../Account/redux/reducer';
import decrypt from '../../helpers/decrypt'; 

export default (initialState = {}) => {
  const preloadedState = typeof (window) !== 'undefined' ? initialState : initialState;
  /* const preloadedState = typeof (window) !== 'undefined' ? decrypt(window.__STATE__) : initialState; */
  const rootReducer = combineReducers({
    router: routerReducer,

    auth,
    catalog,
    landing,
    category,
    instruction,
    document,
    calculator,
    search,
    account,
  });

  return createStore(rootReducer, preloadedState, compose(applyMiddleware(thunk)));
};
