import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const CALL_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.call : configProd.call;

export const callFeedback = body => http.post(`${CALL_API}/feedback`, body).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
