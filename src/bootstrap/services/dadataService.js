import http, { resultDecrypt } from '.';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const DADATA_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.dadata : configProd.dadata;

export const getOrganizationData = request => http.post(`${DADATA_API}/organizations`, { query: request }).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getBankData = request => http.post(`${DADATA_API}/banks`, { query: request }).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getAddressData = request => http.post(`${DADATA_API}/address`, { query: request }).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
