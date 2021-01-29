import http, { resultDecrypt } from '.';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const FILES_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.files : configProd.files;
const COMPANY_VERIFICATION_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.company : configProd.company;
const SEND_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.sending : configProd.sending;

export const fileUpload = file => http.post(`${FILES_API}/secure/upload`, file).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const companyVerification = tin => http.get(`${COMPANY_VERIFICATION_API}/company/${tin}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const sendMail = credentials => http.post(`${SEND_API}/send`, credentials).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const companyWrite = company => http.post(`${COMPANY_VERIFICATION_API}/company/`, company).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const companyUpdate = (companyTin, companyData) => http.put(`${COMPANY_VERIFICATION_API}/company/${companyTin}`, companyData).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
