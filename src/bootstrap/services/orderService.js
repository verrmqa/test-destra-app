import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const ORDER_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.order : configProd.order;

export const makeOrder = r => http.post(`${ORDER_API}/order`, r).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
