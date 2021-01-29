import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const AUTH_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.auth : configProd.auth;

export const login = credentials => http.post(`${AUTH_API}/auth/login`, credentials).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const signup = credentials => http.post(`${AUTH_API}/auth/signup`, credentials).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const restore = credentials => http.post(`${AUTH_API}/auth/restore`, credentials).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const reset = credentials => http.post(`${AUTH_API}/auth/reset`, credentials).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getUser = () => http.get(`${AUTH_API}/auth`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const updateUser = r => http.post(`${AUTH_API}/auth`, r).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const checkToken = credentials => http.post(`${AUTH_API}/auth/token`, credentials).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const logout = () => http.get(`${AUTH_API}/auth/logout`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
