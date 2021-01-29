import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const PROMOCODE_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.promocode : configProd.promocode;

export const getPromocodeData = code => http.get(`${PROMOCODE_API}/promocode/code/${code}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getUserPromoCode = userId => http.get(`${PROMOCODE_API}/promocode/user/${userId}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
