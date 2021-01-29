import * as authApi from '../../../bootstrap/services/authService';

import {
  COMPONENT_AUTH_IDENTIFY,
  COMPONENT_AUTH_RESET,
  COMPONENT_AUTH_RESTORE,
  COMPONENT_AUTH_OPEN,
  COMPONENT_AUTH_CLOSE
} from './types';

const callback = (data, dispatch) => {
  if (data._id) return dispatch({ type: COMPONENT_AUTH_IDENTIFY, user: data });

  return dispatch({ type: COMPONENT_AUTH_IDENTIFY, user: null, data });
};

export const fetchUser = r => dispatch => authApi.getUser(r).then(data => callback(data, dispatch));
export const updateUser = credentials => dispatch => authApi.updateUser(credentials).then(data => callback(data, dispatch));
export const login = credentials => dispatch => authApi.login(credentials).then(data => callback(data, dispatch));
export const signup = credentials => dispatch => authApi.signup(credentials).then(data => callback(data, dispatch));
export const reset = credentials => dispatch => authApi.reset(credentials).then(res => dispatch({ type: COMPONENT_AUTH_RESET, payload: res }));
export const restore = credentials => dispatch => authApi.restore(credentials).then(res => dispatch({ type: COMPONENT_AUTH_RESTORE, payload: res }));

export const logout = () => dispatch => authApi.logout().then(data => callback(data, dispatch));

export const handleOpenAuth = view => dispatch => dispatch({ type: COMPONENT_AUTH_OPEN, view });
export const handleCloseAuth = () => dispatch => dispatch({ type: COMPONENT_AUTH_CLOSE });
