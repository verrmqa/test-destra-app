import http, { resultDecrypt } from './index';
import modeDefine from '../../helpers/modeDefine';
import configDev from '../config/config.dev';
import configProd from '../config/config.prod';

const FAQ_API = (modeDefine() === 'development' || modeDefine() === 'staging') ? configDev.faq : configProd.faq;

export const getFaqs = faqIds => http.get(`${FAQ_API}/faq?q=${faqIds}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
export const getFaq = faqId => http.get(`${FAQ_API}/faq/${faqId}`).then(({ data }) => resultDecrypt(data)).catch(err => resultDecrypt(err.response.data)).catch(err => console.log(err));
