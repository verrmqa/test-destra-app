import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const FEEDBACK_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.feedback : configProd.feedback;
export const bannerFeedback = body => http.post(`${FEEDBACK_API}/bannermail`, body).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
