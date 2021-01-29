import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const BILLING_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.billing : configProd.billing;

export const getTransactions = () => http.get(`${BILLING_API}/transaction`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getTransaction = id => http.get(`${BILLING_API}/transaction/${id}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const createPayment = r => http.post(`${BILLING_API}/transaction`, r).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
