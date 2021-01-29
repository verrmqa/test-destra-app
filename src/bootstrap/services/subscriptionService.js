import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const SUBSCRIPTION_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.subscription : configProd.subscription;

export const subscribeRequest = body => http.post(`${SUBSCRIPTION_API}/subscribe`, body).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
